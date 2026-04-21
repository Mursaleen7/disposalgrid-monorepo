/**
 * DisposalGrid — Component Library Barrel Export
 *
 * All reusable UI components, restyled to the Uber design system.
 */

// ─── Foundation (shadcn/ui, Uber-restyled) ───
export { Button, buttonVariants } from "./ui/button";
export type { ButtonProps } from "./ui/button";

export { Badge, badgeVariants } from "./ui/badge";
export type { BadgeProps } from "./ui/badge";

export { Input } from "./ui/input";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./ui/card";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

// ─── Layout ───
export { Navbar } from "./ui/navbar";
export type { NavbarProps } from "./ui/navbar";

export { Footer } from "./ui/footer";
export type { FooterProps } from "./ui/footer";

export { Logo } from "./ui/logo";

// ─── Search ───
export { SearchBar } from "./ui/search-bar";
export type { SearchBarProps, MaterialOption } from "./ui/search-bar";

// ─── Data Display ───
export { FacilityCard } from "./ui/facility-card";
export type { FacilityCardProps, FacilityBadgeType } from "./ui/facility-card";

export { FacilityFilter } from "./ui/facility-filter";
export type { FacilityData, FacilityFilterProps } from "./ui/facility-filter";

export { HHWEventCard } from "./ui/hhw-event-card";
export type { HHWEventCardProps } from "./ui/hhw-event-card";

export { MetricCard, StatsBar } from "./ui/metric-card";
export type { MetricCardProps, StatsBarProps, StatItem } from "./ui/metric-card";

// ─── Navigation ───
export { Breadcrumb } from "./ui/breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem } from "./ui/breadcrumb";

// ─── Trust & Verification ───
export { VerificationBadge } from "./ui/verification-badge";
export type { VerificationBadgeProps } from "./ui/verification-badge";

// ─── Forms & Monetization ───
export { EventReminderForm } from "./ui/event-reminder-form";
export type { EventReminderFormProps } from "./ui/event-reminder-form";

export { JunkRemovalCTA } from "./ui/junk-removal-cta";
export type { JunkRemovalCTAProps } from "./ui/junk-removal-cta";
