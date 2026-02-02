export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-foreground">OpsFlow</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-full">
              Early Preview
            </span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            A fake-door experiment to validate demand. Not a live product yet.
          </p>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OpsFlow
          </p>
        </div>
      </div>
    </footer>
  );
}
