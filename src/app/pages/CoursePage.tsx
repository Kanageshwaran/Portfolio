import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { subjects, courseAssignments } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  // Find the course and its parent subject
  let foundCourse = null;
  let parentSubject = null;
  
  for (const subject of subjects) {
    const course = subject.courses.find(c => c.id === courseId);
    if (course) {
      foundCourse = course;
      parentSubject = subject;
      break;
    }
  }

  const assignments = courseId ? courseAssignments[courseId] || [] : [];

  if (!foundCourse || !parentSubject) {
    return (
      <div className="container mx-auto px-8 py-16 text-center">
        <h2 className="mb-4">Course Not Found</h2>
        <Button onClick={() => navigate('/academic-work')}>
          Back to Academic Work
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="container mx-auto px-8 py-16">
        <Button
          variant="ghost"
          onClick={() => navigate(`/subject/${parentSubject.id}`)}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {parentSubject.name}
        </Button>

        <div className="mb-12">
          <h1 className="mb-4">{foundCourse.name}</h1>
          <p className="text-muted-foreground text-lg mb-6">{foundCourse.description}</p>
        </div>

        <h2 className="mb-8">Assignments</h2>
        
        {assignments.length === 0 ? (
          <Card className="col-span-12">
            <CardContent className="py-12 text-center text-muted-foreground">
              No assignments available for this course yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="col-span-12 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription className="text-base">{assignment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline">
                    <a
                      href={assignment.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      View on GitHub
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
