import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { subjects } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  
  const subject = subjects.find(s => s.id === subjectId);

  if (!subject) {
    return (
      <div className="container mx-auto px-8 py-16 text-center">
        <h2 className="mb-4">Subject Not Found</h2>
        <Button asChild>
          <Link to="/academic-work">Back to Academic Work</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="container mx-auto px-8 py-16">
        <Button
          variant="ghost"
          onClick={() => navigate('/academic-work')}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Subjects
        </Button>

        <div className="mb-12">
          <div className="text-5xl mb-4">{subject.icon}</div>
          <h1 className="mb-4">{subject.name}</h1>
          <p className="text-muted-foreground text-lg">{subject.description}</p>
        </div>

        <h2 className="mb-8">Courses</h2>
        
        <div className="grid grid-cols-12 gap-8">
          {subject.courses.map((course) => (
            <Card key={course.id} className="col-span-12 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription className="text-base">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm mb-2 text-muted-foreground">Tools Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {course.tools.map((tool) => (
                      <Badge key={tool} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button asChild>
                  <Link to={`/course/${course.id}`}>View Assignments</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
