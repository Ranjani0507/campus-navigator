import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="font-display text-lg font-bold">Campus Nav</div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Find your way around campus — buildings, departments, facilities and shortcuts, all in one place.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/campus-map" className="hover:text-foreground">Campus Map</Link></li>
            <li><Link to="/buildings" className="hover:text-foreground">Buildings</Link></li>
            <li><Link to="/departments" className="hover:text-foreground">Departments</Link></li>
            <li><Link to="/facilities" className="hover:text-foreground">Facilities</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Student</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/favorites" className="hover:text-foreground">My Favorites</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Sign in</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Register</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" /> Main Campus, University Rd.</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 44 1234 5678</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@campus.edu</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Campus Navigation Portal · Built for students.
      </div>
    </footer>
  );
}
