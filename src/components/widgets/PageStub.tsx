type PageStubProps = { title: string; description?: string };

export function PageStub({ title, description }: PageStubProps) {
  return (
    <div className="p-6">
      <h1 className="text-lg font-medium">{title}</h1>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}