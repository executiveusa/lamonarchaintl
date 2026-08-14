import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { fetchAdminTours, WalkingTour } from '@/services/tourService';
import { fetchFieldTests, recordFieldTest, RouteTestResult, WalkingTourFieldTest } from '@/services/routeTestService';

const AdminRouteTestForm = () => {
  const [tours, setTours] = useState<WalkingTour[]>([]);
  const [tourId, setTourId] = useState('');
  const [tests, setTests] = useState<WalkingTourFieldTest[]>([]);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState<RouteTestResult>('needs_work');
  const [flowNotes, setFlowNotes] = useState('');
  const [safetyNotes, setSafetyNotes] = useState('');
  const [accessibilityNotes, setAccessibilityNotes] = useState('');
  const [heatRestNotes, setHeatRestNotes] = useState('');
  const [businessReadinessNotes, setBusinessReadinessNotes] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAdminTours()
      .then(setTours)
      .catch((error) => {
        console.error('Route test tour loading failed:', error);
        toast.error('Could not load tour drafts.');
      });
  }, []);

  useEffect(() => {
    if (!tourId) {
      setTests([]);
      return;
    }
    fetchFieldTests(tourId)
      .then(setTests)
      .catch((error) => {
        console.error('Route test history loading failed:', error);
        toast.error('Could not load field-test history. Apply the route-test migration first.');
      });
  }, [tourId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!tourId || !duration || Number(duration) <= 0) {
      toast.error('Choose a tour and record the actual walking duration.');
      return;
    }

    try {
      setIsSaving(true);
      await recordFieldTest({
        tourId,
        actualDurationMinutes: Number(duration),
        approximateDistanceKm: distance ? Number(distance) : null,
        result,
        routeFlowNotes: flowNotes,
        safetyNotes,
        accessibilityNotes,
        heatRestNotes,
        businessReadinessNotes,
        generalNotes,
      });
      toast.success(result === 'pass' ? 'Passing field test recorded.' : 'Field test recorded as needs work.');
      setTests(await fetchFieldTests(tourId));
      setDuration('');
      setDistance('');
      setFlowNotes('');
      setSafetyNotes('');
      setAccessibilityNotes('');
      setHeatRestNotes('');
      setBusinessReadinessNotes('');
      setGeneralNotes('');
      setResult('needs_work');
    } catch (error) {
      console.error('Field test recording failed:', error);
      toast.error(error instanceof Error ? error.message : 'Could not record field test.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold">Field-test the route before selling it</h2>
      <p className="text-sm text-gray-600 mt-1">
        Walk the exact route in the real world. Record timing, safety, accessibility, heat/rest needs, route flow, and whether the businesses can realistically receive guests.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <div>
          <Label htmlFor="field-test-tour">Tour draft</Label>
          <select id="field-test-tour" value={tourId} onChange={(e) => setTourId(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">Choose a tour</option>
            {tours.filter((tour) => tour.status !== 'archived').map((tour) => (
              <option key={tour.id} value={tour.id}>{tour.title_es} — {tour.status}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><Label htmlFor="field-test-duration">Actual duration (minutes)</Label><Input id="field-test-duration" type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)} required /></div>
          <div><Label htmlFor="field-test-distance">Approx. distance (km)</Label><Input id="field-test-distance" type="number" min="0" step="0.01" value={distance} onChange={(e) => setDistance(e.target.value)} /></div>
          <div>
            <Label htmlFor="field-test-result">Result</Label>
            <select id="field-test-result" value={result} onChange={(e) => setResult(e.target.value as RouteTestResult)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="needs_work">Needs work</option>
              <option value="pass">Pass</option>
            </select>
          </div>
        </div>

        <div><Label htmlFor="field-test-flow">Route flow</Label><Textarea id="field-test-flow" value={flowNotes} onChange={(e) => setFlowNotes(e.target.value)} placeholder="Story order, awkward gaps, crossings, backtracking, pacing..." /></div>
        <div><Label htmlFor="field-test-safety">Safety</Label><Textarea id="field-test-safety" value={safetyNotes} onChange={(e) => setSafetyNotes(e.target.value)} placeholder="Traffic, crossings, lighting, sidewalks, crowding, hazards..." /></div>
        <div><Label htmlFor="field-test-accessibility">Accessibility</Label><Textarea id="field-test-accessibility" value={accessibilityNotes} onChange={(e) => setAccessibilityNotes(e.target.value)} placeholder="Stairs, steep grades, uneven surfaces, seating, mobility constraints..." /></div>
        <div><Label htmlFor="field-test-heat">Heat / rest</Label><Textarea id="field-test-heat" value={heatRestNotes} onChange={(e) => setHeatRestNotes(e.target.value)} placeholder="Shade, water, restrooms, rest opportunities, time-of-day concerns..." /></div>
        <div><Label htmlFor="field-test-business">Business readiness</Label><Textarea id="field-test-business" value={businessReadinessNotes} onChange={(e) => setBusinessReadinessNotes(e.target.value)} placeholder="Can each stop receive a group? Best arrival windows? Any owner constraints?" /></div>
        <div><Label htmlFor="field-test-general">General notes</Label><Textarea id="field-test-general" value={generalNotes} onChange={(e) => setGeneralNotes(e.target.value)} /></div>

        <Button type="submit" disabled={isSaving}>{isSaving ? 'Recording…' : 'Record field test'}</Button>
      </form>

      {tourId && (
        <div className="mt-8 border-t pt-5">
          <h3 className="font-semibold">Test history</h3>
          {tests.length === 0 ? (
            <p className="text-sm text-amber-700 mt-2">No real-world field test has been recorded for this route.</p>
          ) : (
            <div className="space-y-3 mt-3">
              {tests.map((test) => (
                <div key={test.id} className="rounded-md border p-3 text-sm">
                  <div className="font-medium">{test.result === 'pass' ? 'PASS' : 'NEEDS WORK'} · {new Date(test.tested_at).toLocaleString()}</div>
                  <div className="text-gray-600">{test.tested_stop_count} stops · {test.actual_duration_minutes} min{test.approximate_distance_km != null ? ` · ${test.approximate_distance_km} km` : ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default AdminRouteTestForm;
