import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { fetchArticles, Article } from '@/services/articleService';
import { fetchEditorialInterviews, EditorialInterview } from '@/services/interviewService';
import { fetchAdminPlaces, Place } from '@/services/placeService';
import {
  createEditorialWorkItem,
  EditorialStage,
  EditorialWorkItem,
  editorialGateSummary,
  fetchEditorialWorkItems,
  updateEditorialWorkItem,
} from '@/services/editorialWorkflowService';

const STAGES: EditorialStage[] = [
  'scheduled',
  'interview_completed',
  'source_ready',
  'story_draft',
  'fact_check',
  'editor_approved',
  'published',
  'archived',
];

const AdminEditorialWorkflow = () => {
  const [items, setItems] = useState<EditorialWorkItem[]>([]);
  const [interviews, setInterviews] = useState<EditorialInterview[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [title, setTitle] = useState('');
  const [interviewId, setInterviewId] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [notes, setNotes] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const articleById = useMemo(() => new Map(articles.map((row) => [row.id, row])), [articles]);
  const placeById = useMemo(() => new Map(places.map((row) => [row.id, row])), [places]);
  const interviewById = useMemo(() => new Map(interviews.map((row) => [row.id, row])), [interviews]);

  const load = async () => {
    try {
      const [workRows, interviewRows, articleRows, placeRows] = await Promise.all([
        fetchEditorialWorkItems(),
        fetchEditorialInterviews(),
        fetchArticles(),
        fetchAdminPlaces(),
      ]);
      setItems(workRows);
      setInterviews(interviewRows);
      setArticles(articleRows);
      setPlaces(placeRows);
    } catch (error) {
      console.error('Editorial workflow loading failed:', error);
      toast.error('Could not load the editorial workflow. Apply and verify the workflow migration first.');
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      toast.error('Working title is required.');
      return;
    }
    try {
      setIsCreating(true);
      await createEditorialWorkItem({
        title,
        interviewId: interviewId || undefined,
        placeId: placeId || undefined,
        notes: notes || undefined,
      });
      setTitle('');
      setInterviewId('');
      setPlaceId('');
      setNotes('');
      toast.success('Editorial work item created. Nothing is public yet.');
      await load();
    } catch (error) {
      console.error('Editorial work item creation failed:', error);
      toast.error('Could not create the work item.');
    } finally {
      setIsCreating(false);
    }
  };

  const patch = async (id: string, value: Parameters<typeof updateEditorialWorkItem>[1]) => {
    try {
      await updateEditorialWorkItem(id, value);
      await load();
    } catch (error) {
      console.error('Editorial workflow update failed:', error);
      toast.error(error instanceof Error ? error.message : 'Workflow gate rejected that change.');
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Start a story workflow</h2>
        <p className="text-sm text-gray-600 mt-1">Create the production record before publication. Interviews and places can be linked immediately or later.</p>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="md:col-span-2"><Label htmlFor="workflow-title">Working title</Label><Input id="workflow-title" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
          <div>
            <Label htmlFor="workflow-interview">Interview</Label>
            <select id="workflow-interview" value={interviewId} onChange={(e) => setInterviewId(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="">No interview linked yet</option>
              {interviews.map((row) => <option key={row.id} value={row.id}>{row.subject_name}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="workflow-place">Place</Label>
            <select id="workflow-place" value={placeId} onChange={(e) => setPlaceId(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="">No place linked yet</option>
              {places.map((row) => <option key={row.id} value={row.id}>{row.name}</option>)}
            </select>
          </div>
          <div className="md:col-span-2"><Label htmlFor="workflow-notes">Editorial notes</Label><Textarea id="workflow-notes" value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
          <div className="md:col-span-2"><Button type="submit" disabled={isCreating}>{isCreating ? 'Creating…' : 'Create workflow item'}</Button></div>
        </form>
      </section>

      <section className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Production board</h2>
        <p className="text-sm text-gray-600 mt-1">Approval and publication are gated by consent, source review, fact checking, and a linked article.</p>
        <div className="mt-5 space-y-5">
          {items.length === 0 && <p className="text-sm text-gray-600">No editorial work items yet.</p>}
          {items.map((item) => {
            const missing = editorialGateSummary(item);
            const linkedInterview = item.interview_id ? interviewById.get(item.interview_id) : undefined;
            const linkedArticle = item.article_id ? articleById.get(item.article_id) : undefined;
            const linkedPlace = item.place_id ? placeById.get(item.place_id) : undefined;
            return (
              <div key={item.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {linkedInterview ? `Interview: ${linkedInterview.subject_name}` : 'No interview'} · {linkedPlace ? `Place: ${linkedPlace.name}` : 'No place'} · {linkedArticle ? `Article: ${linkedArticle.title}` : 'No article'}
                    </div>
                  </div>
                  <select value={item.stage} onChange={(e) => patch(item.id, { stage: e.target.value as EditorialStage })} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                    {STAGES.map((stage) => <option key={stage} value={stage}>{stage.split('_').join(' ')}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {([
                    ['consent_checked', 'Consent'],
                    ['source_material_checked', 'Sources'],
                    ['facts_checked', 'Facts'],
                    ['bilingual_reviewed', 'Bilingual'],
                  ] as const).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input type="checkbox" checked={item[key]} onChange={(e) => patch(item.id, { [key]: e.target.checked })} />
                      {label}
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Linked article</Label>
                    <select value={item.article_id || ''} onChange={(e) => patch(item.id, { article_id: e.target.value || null })} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">No article linked</option>
                      {articles.map((row) => <option key={row.id} value={row.id}>{row.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>Linked place</Label>
                    <select value={item.place_id || ''} onChange={(e) => patch(item.id, { place_id: e.target.value || null, route_candidate: false })} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">No place linked</option>
                      {places.map((row) => <option key={row.id} value={row.id}>{row.name}</option>)}
                    </select>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={item.route_candidate} onChange={(e) => patch(item.id, { route_candidate: e.target.checked })} />
                  Eligible narrative candidate for a future walking-tour stop
                </label>

                <div className="text-xs text-gray-600">
                  {missing.length ? <>Still missing: <strong>{missing.join(', ')}</strong></> : <strong>Editorial evidence gates complete.</strong>}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AdminEditorialWorkflow;
