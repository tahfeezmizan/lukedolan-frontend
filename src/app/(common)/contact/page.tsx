import ContactForm from "@/components/common/contact-form";
import { NewsletterSection } from "@/components/shared/pages/newsletter-section";
import React from "react";

export default function page() {
  return (
    <div>
      <ContactForm />
      <NewsletterSection />
    </div>
  );
}
