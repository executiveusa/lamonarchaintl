import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { fetchAdminPlaces, Place } from '@/services/placeService';
import {
  createEditorialInterview,
  EditorialInterview,
  fetchEditorialInterviews,
  InterviewConsentStatus,
  InterviewStatus,
  InterviewSubjectType,
} from '@/services/interviewService';

const AdminInterviewForm = () => {
  const [interviews, setInterviews] = useState<EditorialInterview[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [subjectType, setSubjectType] = useState<InterviewSubjectType>('person');
  const [placeId, setPlaceId] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewer, setInterviewer] = useState('');
  const [consentStatus, setConsentStatus] = useState<InterviewConsentStatus>('not_recorded');
  const [status, setStatus] = useState<InterviewStatus>('planned');
  const [sourceNotes, setSourceNotes] = useState('');
  const [transcriptUrl, setTranscriptUrl] = useState('');
  const [recordingUrl, setRecordingUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const sortedPlaces = useMemo(
    () => [...places].sort((a, b) => a.name.localeCompare(b.name)),
    [places],
  );

  const load = async () => {
    try {
      const [interviewRows, placeRows] = await Promise.all([
        fetchEditorialInterviews(),
        fetchAdminPlaces(),
      ]);
      setInterviews(interviewRows);
      setPlaces(placeRows);
    } catch (error) {
      console.error('Interview desk loading failed:', error);
      toast.error('Could not load interview records. Apply and verify the interview migration first.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!subjectName.trim()) {
      toast.error('Interview subject is required.');
      return;
    }

    try {
      setIsSaving(true);
      await createEditorialInterview({
        subjectName,
        subjectType,
        placeId: placeId || undefined,
        interviewDate: interviewDate || undefined,
        interviewer: interviewer || undefined,
        consentStatus,
        status,
        sourceNotes: sourceNotes || undefined,
        transcriptUrl: transcriptUrl || undefined,
        recordingUrl: recordingUrl || undefined,
      });
      toast.success('Interview record saved privately to the editorial desk.');
      setSubjectName('');
      setSubjectType('person');
      setPlaceId('');
      setInterviewDate('');
      setInterviewer('');
      setConsentStatus('not_recorded');
      setStatus('planned');
      setSourceNotes('');
      setTranscriptUrl('');
      setRecordingUrl('');
      await load();
    } catch (error) {
      console.error('Interview record creation failed:', error);
      toast.error('Could not save the interview record.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Interview intake</h2>
        <p className="text-sm text-gray-600 mt-1">Private source material. Nothing entered here becomes public automatically.</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div><Label htmlFor="interview-subject">Subject</Label><Input id="interview-subject" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required /></div>
          <div>
            <Label htmlFor="interview-type">Subject type</Label>
            <select id="interview-type" value={subjectType} onChange={(e) => setSubjectType(e.target.value as InterviewSubjectType)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="artist">Artist</option>
              <option value="business_owner">Business owner</option>
              <option value="chef">Chef</option>
              <option value="maker">Maker</option>
              <option value="guide">Guide</option>
              <option value="person">Person</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="interview-place">Related place</Label>
            <select id="interview-place" value={placeId} onChange={(e) => setPlaceId(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">No place linked yet</option>
              {sortedPlaces.map((place) => <option key={place.id} value={place.id}>{place.name}</option>)}
            </select>
          </div>
          <div><Label htmlFor="interview-date">Interview date</Label><Input id="interview-date" type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} /></div>
          <div><Label htmlFor="interviewer">Interviewer</Label><Input id="interviewer" value={interviewer} onChange={(e) => setInterviewer(e.target.value)} /></div>
          <div>
            <Label htmlFor="consent-status">Consent record</Label>
            <select id="consent-status" value={consentStatus} onChange={(e) => setConsentStatus(e.target.value as InterviewConsentStatus)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="not_recorded">Not recorded</option>
              <option value="verbal">Verbal</option>
              <option value="written">Written</option>
            </select>
          </div>
          <div>
            <Label htmlFor="interview-status">Status</Label>
            <select id="interview-status" value={status} onChange={(e) => setStatus(e.target.value as InterviewStatus)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="planned">Planned</option>
              <option value="completed">Completed</option>
              <option value="approved_for_story">Approved for story</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="md:col-span-2"><Label htmlFor="source-notes">Source notes</Label><Textarea id="source-notes" value={sourceNotes} onChange={(e) => setSourceNotes(e.target.value)} placeholder="What was discussed, what still needs verification, and any editorial follow-up." /></div>
          <div><Label htmlFor="transcript-url">Transcript URL</Label><Input id="transcript-url" type="url" value={transcriptUrl} onChange={(e) => setTranscriptUrl(e.target.value)} /></div>
          <div><Label htmlFor="recording-url">Recording URL</Label><Input id="recording-url" type="url" value={recordingUrl} onChange={(e) => setRecordingUrl(e.target.value)} /></div>
          <div className="md:col-span-2"><Button type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save private interview record'}</Button></div>
        </form>
      </section>

      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Interview pipeline</h2>
        <div className="mt-4 space-y-3">
          {interviews.length === 0 && <p className="text-sm text-gray-600">No interviews recorded yet.</p>}
          {interviews.map((interview) => (
            <div key={interview.id} className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b pb-3">
              <div>
                <div className="font-medium">{interview.subject_name}</div>
                <div className="text-xs text-gray-500">{interview.subject_type}{interview.interview_date ? ` · ${interview.interview_date}` : ''}</div>
              </div>
              <div className="text-xs text-gray-600">status: <strong>{interview.status}</strong> · consent: <strong>{interview.consent_status}</strong></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminInterviewForm;
