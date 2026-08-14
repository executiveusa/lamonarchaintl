import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { fetchAdminPlaces, Place } from '@/services/placeService';
import {
  addTourStop,
  createWalkingTour,
  fetchAdminTours,
  publishWalkingTour,
  WalkingTour,
} from '@/services/tourService';

const slugify = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const AdminTourForm = () => {
  const [tours, setTours] = useState<WalkingTour[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);

  const [titleEs, setTitleEs] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [slug, setSlug] = useState('');
  const [descriptionEs, setDescriptionEs] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [meetingPoint, setMeetingPoint] = useState('');
  const [priceMxn, setPriceMxn] = useState('');
  const [priceUsd, setPriceUsd] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const [tourId, setTourId] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [stopOrder, setStopOrder] = useState('1');
  const [storyEs, setStoryEs] = useState('');
  const [storyEn, setStoryEn] = useState('');
  const [isAddingStop, setIsAddingStop] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const eligiblePlaces = useMemo(
    () => places.filter((place) => place.verification_status === 'verified' && place.publication_status === 'published'),
    [places],
  );

  const load = async () => {
    try {
      const [tourRows, placeRows] = await Promise.all([fetchAdminTours(), fetchAdminPlaces()]);
      setTours(tourRows);
      setPlaces(placeRows);
    } catch (error) {
      console.error('Tour builder loading failed:', error);
      toast.error('Could not load tours. Apply and verify the tour migration first.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!titleEs.trim() || !titleEn.trim()) {
      toast.error('Spanish and English tour titles are required.');
      return;
    }

    try {
      setIsCreating(true);
      const created = await createWalkingTour({
        slug: slugify(slug || titleEs),
        titleEs: titleEs.trim(),
        titleEn: titleEn.trim(),
        descriptionEs: descriptionEs.trim() || undefined,
        descriptionEn: descriptionEn.trim() || undefined,
        neighborhood: neighborhood.trim() || undefined,
        durationMinutes: durationMinutes ? Number(durationMinutes) : null,
        meetingPoint: meetingPoint.trim() || undefined,
        priceMxn: priceMxn ? Number(priceMxn) : null,
        priceUsd: priceUsd ? Number(priceUsd) : null,
      });
      toast.success('Draft walking tour created. It is not public.');
      setTourId(created.id);
      setTitleEs('');
      setTitleEn('');
      setSlug('');
      setDescriptionEs('');
      setDescriptionEn('');
      setNeighborhood('');
      setDurationMinutes('');
      setMeetingPoint('');
      setPriceMxn('');
      setPriceUsd('');
      await load();
    } catch (error) {
      console.error('Tour creation failed:', error);
      toast.error('Could not create the tour draft.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleAddStop = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!tourId || !placeId) {
      toast.error('Choose a tour and an eligible verified place.');
      return;
    }

    try {
      setIsAddingStop(true);
      await addTourStop({
        tourId,
        placeId,
        stopOrder: Number(stopOrder),
        storyNoteEs: storyEs.trim() || undefined,
        storyNoteEn: storyEn.trim() || undefined,
      });
      toast.success('Verified place added as a tour stop.');
      setPlaceId('');
      setStopOrder(String(Number(stopOrder) + 1));
      setStoryEs('');
      setStoryEn('');
    } catch (error) {
      console.error('Tour stop creation failed:', error);
      toast.error(error instanceof Error ? error.message : 'Could not add the stop.');
    } finally {
      setIsAddingStop(false);
    }
  };

  const handlePublish = async () => {
    if (!tourId) {
      toast.error('Choose a tour first.');
      return;
    }

    try {
      setIsPublishing(true);
      await publishWalkingTour(tourId);
      toast.success('Tour published. Database guard confirmed the minimum verified-stop requirements.');
      await load();
    } catch (error) {
      console.error('Tour publishing failed:', error);
      toast.error(error instanceof Error ? error.message : 'Tour cannot be published yet.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Create a walking-tour draft</h2>
        <p className="text-sm text-gray-600 mt-1">Tours are products built from verified places. Price is optional until the route and operating model are ready.</p>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div><Label htmlFor="tour-title-es">Title — Spanish</Label><Input id="tour-title-es" value={titleEs} onChange={(e) => { setTitleEs(e.target.value); if (!slug) setSlug(slugify(e.target.value)); }} required /></div>
          <div><Label htmlFor="tour-title-en">Title — English</Label><Input id="tour-title-en" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required /></div>
          <div><Label htmlFor="tour-slug">Slug</Label><Input id="tour-slug" value={slug} onChange={(e) => setSlug(e.target.value)} required /></div>
          <div><Label htmlFor="tour-neighborhood">Neighborhood / area</Label><Input id="tour-neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} /></div>
          <div><Label htmlFor="tour-duration">Duration (minutes)</Label><Input id="tour-duration" type="number" min="1" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} /></div>
          <div><Label htmlFor="tour-meeting-point">Meeting point</Label><Input id="tour-meeting-point" value={meetingPoint} onChange={(e) => setMeetingPoint(e.target.value)} /></div>
          <div><Label htmlFor="tour-price-mxn">Price MXN</Label><Input id="tour-price-mxn" type="number" min="0" step="0.01" value={priceMxn} onChange={(e) => setPriceMxn(e.target.value)} /></div>
          <div><Label htmlFor="tour-price-usd">Price USD</Label><Input id="tour-price-usd" type="number" min="0" step="0.01" value={priceUsd} onChange={(e) => setPriceUsd(e.target.value)} /></div>
          <div className="md:col-span-2"><Label htmlFor="tour-desc-es">Description — Spanish</Label><Textarea id="tour-desc-es" value={descriptionEs} onChange={(e) => setDescriptionEs(e.target.value)} /></div>
          <div className="md:col-span-2"><Label htmlFor="tour-desc-en">Description — English</Label><Textarea id="tour-desc-en" value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} /></div>
          <div className="md:col-span-2"><Button type="submit" disabled={isCreating}>{isCreating ? 'Creating…' : 'Create tour draft'}</Button></div>
        </form>
      </section>

      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Build the route from verified places</h2>
        <p className="text-sm text-gray-600 mt-1">Only places that are both verified and published are eligible stops.</p>
        <form onSubmit={handleAddStop} className="space-y-4 mt-5">
          <div>
            <Label htmlFor="tour-select">Tour</Label>
            <select id="tour-select" value={tourId} onChange={(e) => setTourId(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Choose a draft</option>
              {tours.filter((tour) => tour.status !== 'archived').map((tour) => <option key={tour.id} value={tour.id}>{tour.title_es} — {tour.status}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="tour-place">Verified place</Label>
            <select id="tour-place" value={placeId} onChange={(e) => setPlaceId(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Choose an eligible place</option>
              {eligiblePlaces.map((place) => <option key={place.id} value={place.id}>{place.name} — {place.neighborhood || place.city}</option>)}
            </select>
          </div>
          <div><Label htmlFor="stop-order">Stop order</Label><Input id="stop-order" type="number" min="1" value={stopOrder} onChange={(e) => setStopOrder(e.target.value)} /></div>
          <div><Label htmlFor="stop-story-es">Story note — Spanish</Label><Textarea id="stop-story-es" value={storyEs} onChange={(e) => setStoryEs(e.target.value)} /></div>
          <div><Label htmlFor="stop-story-en">Story note — English</Label><Textarea id="stop-story-en" value={storyEn} onChange={(e) => setStoryEn(e.target.value)} /></div>
          <Button type="submit" disabled={isAddingStop || eligiblePlaces.length === 0}>{isAddingStop ? 'Adding…' : 'Add verified stop'}</Button>
        </form>
        {eligiblePlaces.length === 0 && <p className="text-sm text-amber-700 mt-4">No eligible stops yet. Complete real place verification and publication first.</p>}
      </section>

      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Publication gate</h2>
        <p className="text-sm text-gray-600 mt-1">The database refuses publication unless the route has at least two stops and all stops still qualify as verified, published places.</p>
        <Button type="button" onClick={handlePublish} disabled={!tourId || isPublishing} className="mt-4">{isPublishing ? 'Checking…' : 'Publish selected tour'}</Button>
      </section>
    </div>
  );
};

export default AdminTourForm;
