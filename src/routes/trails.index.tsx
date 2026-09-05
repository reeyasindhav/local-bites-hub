import { createFileRoute } from "@tanstack/react-router";
import { TrailsPage } from "./trails";

export const Route = createFileRoute("/trails/")({
  component: TrailsPage,
});
