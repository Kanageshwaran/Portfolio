import { Link } from 'react-router-dom';
import { subjects } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function AcademicWorkPage() {
  return (
    <div className="w-full">
      <section className="container mx-auto px-8 py-16">
        <h1 className="mb-4">Choose a Subject</h1>
        <p className="text-muted-foreground mb-12 text-lg max-w-3xl">
          Explore my academic work organized by subject. Each subject contains courses 
          with detailed assignments and projects.
        </p>
        
        <div className="grid grid-cols-12 gap-8">
          {subjects.map((subject) => (
            <Card key={subject.id} className="col-span-12 md:col-span-6 lg:col-span-4 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">{subject.icon}</div>
                <CardTitle>{subject.name}</CardTitle>
                <CardDescription className="text-base">{subject.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {subject.courses.length} {subject.courses.length === 1 ? 'course' : 'courses'} available
                </p>
                <Button asChild className="w-full">
                  <Link to={`/subject/${subject.id}`}>View Courses</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
