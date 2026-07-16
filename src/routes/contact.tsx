import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Campus Navigation Portal" },
      { name: "description", content: "Reach the campus office, or sign in / register for a student account." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  return (
    <>
      <PageShell eyebrow="Contact" title="We'd love to hear from you" description="Questions about campus, admissions or the portal? Drop us a message." />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-semibold">Get in touch</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-primary-foreground"><MapPin className="h-4 w-4" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Address</div>
                  <div className="font-medium">Main Campus, University Rd., 600000</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-primary-foreground"><Phone className="h-4 w-4" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Phone</div>
                  <div className="font-medium">+91 44 1234 5678</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-primary-foreground"><Mail className="h-4 w-4" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Email</div>
                  <div className="font-medium">hello@campus.edu</div>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="bg-gradient-brand p-6 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-lg font-semibold">Student sign in</h3>
            <p className="mt-1 text-sm text-primary-foreground/85">
              Login and registration are coming next. For now, favorites are saved to this device.
            </p>
          </Card>
        </div>

        <Card className="p-6 shadow-soft">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSending(true);
              setTimeout(() => {
                setSending(false);
                toast.success("Message sent", { description: "We'll get back within 2 business days." });
                (e.target as HTMLFormElement).reset();
              }, 700);
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="you@campus.edu" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required placeholder="How can we help?" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="msg">Message</Label>
              <Textarea id="msg" required rows={6} placeholder="Type your message…" />
            </div>
            <Button disabled={sending} className="w-full bg-gradient-brand text-primary-foreground hover:opacity-90">
              <Send className="mr-1 h-4 w-4" /> {sending ? "Sending…" : "Send message"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
