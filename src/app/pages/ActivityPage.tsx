import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { supabase } from "../../lib/supabaseClient";

type ActivityDetailRow = {
  id: string;
  title: string;
  description: string | null; // use as story for now
  organization: string | null;
  location: string | null;
};

export function ActivityPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();

  const safeId = useMemo(() => activityId?.trim() ?? "", [activityId]);

  const [activity, setActivity] = useState<ActivityDetailRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!safeId) {
        setActivity(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMsg(null);

      const res = await supabase
        .from("activities")
        .select("id,title,description,organization,location")
        .eq("id", safeId)
        .eq("is_visible", true)
        .single();

      if (!mounted) return;

      if (res.error) {
        setErrorMsg(res.error.message);
        setActivity(null);
        setLoading(false);
        return;
      }

      setActivity(res.data as ActivityDetailRow);
      setLoading(false);
    }

    load();
    return () => {
      mounted = false;
    };
  }, [safeId]);

  if (!loading && !activity) {
    return (
      <div className="container mx-auto px-8 py-16 text-center">
        <h2 className="mb-4">Activity Not Found</h2>
        {errorMsg && (
          <p className="text-muted-foreground mb-6 text-sm">{errorMsg}</p>
        )}
        <Button asChild>
          <Link to="/activities">Back to Activities</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="container mx-auto px-8 py-16">
        <Button
          variant="ghost"
          onClick={() => navigate("/activities")}
          className="mb-8"
          disabled={loading}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Activities
        </Button>

        {errorMsg && (
          <div className="mb-8 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm">
            Failed to load activity: {errorMsg}
          </div>
        )}

        {loading ? (
          <div className="text-muted-foreground">Loading activity…</div>
        ) : (
          <>
            <div className="mb-10">
              <h1 className="mb-4">{activity?.title}</h1>
            </div>

            <div className="mb-10 grid grid-cols-12 gap-6">
              <Card className="col-span-12 md:col-span-6">
                <CardContent className="py-6 space-y-2">
                  <div className="text-sm text-muted-foreground">Organization</div>
                  <div className="text-base">{activity?.organization ?? "—"}</div>
                </CardContent>
              </Card>

              <Card className="col-span-12 md:col-span-6">
                <CardContent className="py-6 space-y-2">
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="text-base">{activity?.location ?? "—"}</div>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-4xl">
              <h2 className="mb-4">Story</h2>
              <div className="text-muted-foreground text-lg whitespace-pre-line">
                {activity?.description ?? "Story not added yet."}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
