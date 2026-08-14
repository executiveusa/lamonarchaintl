import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  addPlaceVerification,
  createPlace,
  fetchAdminPlaces,
  Place,
  publishVerifiedPlace,
  unpublishPlace,
  VerificationMethod,
} from '@/services/placeService';

const slugify = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const AdminPlaceForm = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [descriptionEs, setDescriptionEs] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [busyPlaceId, setBusyPlaceId] = useState<string | null>(null);

  const [verificationPlaceId, setVerificationPlaceId] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('owner_confirmation');
  const [verificationNotes, setVerificationNotes] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const loadPlaces = async () => {
    try {
      setPlaces(await fetchAdminPlaces());
    } catch (error) {
      console.error('Admin place loading failed:', error);
      toast.error('Could not load places. Verify the migration and admin RLS first.');
    }
  };

  useEffect(() => {
    loadPlaces();
  }, []);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slug || slug === slugify(name)) setSlug(slugify(value));
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !slug.trim()) {
      toast.error('Name and slug are required.');
      return;
    }

    try {
      setIsSaving(true);
      await createPlace({
        name: name.trim(),
        slug: slugify(slug),
        description_es: descriptionEs.trim() || undefined,
        description_en: descriptionEn.trim() || undefined,
        address: address.trim() || undefined,
        neighborhood: neighborhood.trim() || undefined,
        website_url: websiteUrl.trim() || undefined,
        instagram_url: instagramUrl.trim() || undefined,
        publication_status: 'draft',
        verification_status: 'pending',
      });
      toast.success('Place saved to the verification queue. It is not public yet.');
      setName('');
      setSlug('');
      setDescriptionEs('');
      setDescriptionEn('');
      setAddress('');
      setNeighborhood('');
      setWebsiteUrl('');
      setInstagramUrl('');
      await loadPlaces();
    } catch (error) {
      console.error('Place creation failed:', error);
      toast.error('Could not save the place.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!verificationPlaceId) {
      toast.error('Choose a place to verify.');
      return;
    }
    if (!verificationNotes.trim()) {
      toast.error('Add verification evidence or notes before approving.');
      return;
    }

    try {
      setIsVerifying(true);
      await addPlaceVerification({
        placeId: verificationPlaceId,
        method: verificationMethod,
        evidenceNotes: verificationNotes,
      });
      toast.success('Verification recorded. Publish status remains a separate editorial decision.');
      setVerificationPlaceId('');
      setVerificationNotes('');
      await loadPlaces();
    } catch (error) {
      console.error('Place verification failed:', error);
      toast.error('Could not record verification.');
    } finally {
      setIsVerifying(false);
    }
  };

  const togglePublication = async (place: Place) => {
    try {
      setBusyPlaceId(place.id);
      if (place.publication_status === 'published') {
        await unpublishPlace(place.id);
        toast.success('Place removed from the public guide.');
      } else {
        await publishVerifiedPlace(place);
        toast.success('Verified place published to La Guía.');
      }
      await loadPlaces();
    } catch (error) {
      console.error('Place publication change failed:', error);
      toast.error(error instanceof Error ? error.message : 'Could not change publication status.');
    } finally {
      setBusyPlaceId(null);
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Add a place to the verification queue</h2>
        <p className="text-sm text-gray-600 mt-1">New records are drafts and cannot appear in La Guía until verification and publication are both complete.</p>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div><Label htmlFor="place-name">Name</Label><Input id="place-name" value={name} onChange={(e) => handleNameChange(e.target.value)} required /></div>
          <div><Label htmlFor="place-slug">Slug</Label><Input id="place-slug" value={slug} onChange={(e) => setSlug(e.target.value)} required /></div>
          <div><Label htmlFor="place-neighborhood">Neighborhood</Label><Input id="place-neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} /></div>
          <div><Label htmlFor="place-address">Address</Label><Input id="place-address" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
          <div><Label htmlFor="place-website">Official website</Label><Input id="place-website" type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} /></div>
          <div><Label htmlFor="place-instagram">Official Instagram URL</Label><Input id="place-instagram" type="url" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} /></div>
          <div className="md:col-span-2"><Label htmlFor="place-description-es">Editorial note — Spanish</Label><Textarea id="place-description-es" value={descriptionEs} onChange={(e) => setDescriptionEs(e.target.value)} /></div>
          <div className="md:col-span-2"><Label htmlFor="place-description-en">Editorial note — English</Label><Textarea id="place-description-en" value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} /></div>
          <div className="md:col-span-2"><Button type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save to verification queue'}</Button></div>
        </form>
      </section>

      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Record human verification</h2>
        <p className="text-sm text-gray-600 mt-1">Verification needs evidence. This records who verified the place and when. Publishing remains separate.</p>
        <form onSubmit={handleVerify} className="space-y-4 mt-5">
          <div>
            <Label htmlFor="verify-place">Place</Label>
            <select id="verify-place" value={verificationPlaceId} onChange={(e) => setVerificationPlaceId(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Choose a place</option>
              {places.filter((place) => place.verification_status !== 'verified').map((place) => <option key={place.id} value={place.id}>{place.name} — {place.verification_status}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="verification-method">Method</Label>
            <select id="verification-method" value={verificationMethod} onChange={(e) => setVerificationMethod(e.target.value as VerificationMethod)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="staff_visit">Staff visit</option>
              <option value="owner_confirmation">Owner/manager confirmation</option>
              <option value="official_channel">Official channel checked</option>
              <option value="location_hours_check">Location/hours checked</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div><Label htmlFor="verification-notes">Evidence / notes</Label><Textarea id="verification-notes" value={verificationNotes} onChange={(e) => setVerificationNotes(e.target.value)} placeholder="What was checked? Who confirmed it? What evidence exists?" required /></div>
          <Button type="submit" disabled={isVerifying}>{isVerifying ? 'Recording…' : 'Record verification'}</Button>
        </form>
      </section>

      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Current place records</h2>
        <div className="mt-4 space-y-3">
          {places.length === 0 && <p className="text-sm text-gray-600">No place records yet.</p>}
          {places.map((place) => (
            <div key={place.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-3">
              <div>
                <div className="font-medium">{place.name}</div>
                <div className="text-xs text-gray-500">{place.neighborhood || place.city}</div>
                <div className="text-xs text-gray-600 mt-1">verification: <strong>{place.verification_status}</strong> · publication: <strong>{place.publication_status}</strong></div>
              </div>
              <Button
                type="button"
                variant={place.publication_status === 'published' ? 'outline' : 'default'}
                disabled={busyPlaceId === place.id || (place.verification_status !== 'verified' && place.publication_status !== 'published')}
                onClick={() => togglePublication(place)}
              >
                {busyPlaceId === place.id ? 'Saving…' : place.publication_status === 'published' ? 'Unpublish' : 'Publish verified place'}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPlaceForm;
