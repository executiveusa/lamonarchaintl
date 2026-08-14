import { supabase } from '@/integrations/supabase/client';

const db = supabase as any;

export type RouteTestResult = 'needs_work' | 'pass';

export interface WalkingTourFieldTest {
  id: string;
  tour_id: string;
  tested_at: string;
  tested_by?: string | null;
  tested_stop_count: number;
  actual_duration_minutes: number;
  approximate_distance_km?: number | null;
  result: RouteTestResult;
  route_flow_notes?: string | null;
  safety_notes?: string | null;
  accessibility_notes?: string | null;
  heat_rest_notes?: string | null;
  business_readiness_notes?: string | null;
  general_notes?: string | null;
  created_at: string;
}

export async function fetchTourStopCount(tourId: string): Promise<number> {
  const { count, error } = await db
    .from('walking_tour_stops')
    .select('*', { count: 'exact', head: true })
    .eq('tour_id', tourId);

  if (error) throw error;
  return count ?? 0;
}

export async function fetchFieldTests(tourId: string): Promise<WalkingTourFieldTest[]> {
  const { data, error } = await db
    .from('walking_tour_field_tests')
    .select('*')
    .eq('tour_id', tourId)
    .order('tested_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function recordFieldTest(input: {
  tourId: string;
  actualDurationMinutes: number;
  approximateDistanceKm?: number | null;
  result: RouteTestResult;
  routeFlowNotes?: string;
  safetyNotes?: string;
  accessibilityNotes?: string;
  heatRestNotes?: string;
  businessReadinessNotes?: string;
  generalNotes?: string;
}): Promise<void> {
  const testedStopCount = await fetchTourStopCount(input.tourId);
  if (testedStopCount < 2) {
    throw new Error('Field testing starts only after the route has at least two verified stops.');
  }

  const { data: { session } } = await supabase.auth.getSession();
  const { error } = await db.from('walking_tour_field_tests').insert({
    tour_id: input.tourId,
    tested_by: session?.user?.id || null,
    tested_stop_count: testedStopCount,
    actual_duration_minutes: input.actualDurationMinutes,
    approximate_distance_km: input.approximateDistanceKm ?? null,
    result: input.result,
    route_flow_notes: input.routeFlowNotes?.trim() || null,
    safety_notes: input.safetyNotes?.trim() || null,
    accessibility_notes: input.accessibilityNotes?.trim() || null,
    heat_rest_notes: input.heatRestNotes?.trim() || null,
    business_readiness_notes: input.businessReadinessNotes?.trim() || null,
    general_notes: input.generalNotes?.trim() || null,
  });

  if (error) throw error;
}
