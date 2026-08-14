# La Monarca — First Real Feature Runbook

Purpose: move one real local person/place through the full publication system without invented facts, fake verification, or premature public claims.

## 1. Interview intake
- Record the real subject name and subject type.
- Link the related place if one already exists.
- Record interview date and interviewer.
- Record consent as verbal or written only when it actually occurred.
- Attach transcript and/or recording location when available.
- Keep private notes private.

Gate: a linked interview cannot pass editor approval while consent is `not_recorded`.

## 2. Place intake
- Create one canonical place record.
- Record official location/contact channels that were actually checked.
- Keep the place in draft/pending while verification is incomplete.
- Record verification evidence using the real method used: staff visit, owner confirmation, official channel, location/hours check, or other documented evidence.

Gate: verification and publication are separate decisions. Verified does not automatically mean recommended or public.

## 3. Story production
- Create the editorial workflow item.
- Create the article as a draft.
- Link the interview, draft article, and place to the workflow item.
- Complete source review.
- Complete fact check.
- Complete bilingual review.
- Obtain editor approval.

Gate: new articles are drafts by default and public readers only fetch `publication_status = published`.

## 4. Publish truthfully
- Move the governed workflow to `published` only after the required evidence gates pass.
- The workflow publishes the linked article canonically.
- Do not claim live social distribution, audience numbers, demand, sales, or tour readiness without evidence.

## 5. Route candidacy
- A story may become a route candidate only after publication.
- The related place must still be verified and published.
- The article must be explicitly linked to the same place in `article_places`.
- Route candidacy records a narrative candidate, not a tour commitment.

## 6. Walking-tour productization
- Curate multiple eligible verified places into a coherent route.
- Physically walk the route.
- Record actual duration, approximate distance, route flow, safety, accessibility, heat/rest, and business-readiness notes.
- Mark the field test `pass` only when the route is genuinely ready.

Gate: tour publication requires a passing field test for the current stop count.

## Definition of Done — First Real Feature
One real feature is complete when:
1. real interview/source material exists;
2. consent state is recorded truthfully;
3. place verification evidence exists;
4. story passes source, fact, and bilingual review;
5. the article is published through the governed workflow;
6. the public story and verified place agree on identity and facts;
7. the article/place relationship is recorded;
8. no fake metrics, reviews, ratings, demand, or tour claims are present;
9. evidence and rollback are preserved.

This is the template for every future La Monarca local feature.
