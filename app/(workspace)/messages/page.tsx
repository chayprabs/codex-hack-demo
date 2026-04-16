import { MessageOpsPanel } from "@/components/messages/message-ops-panel";
import { MessageCenter } from "@/components/messages/message-center";
import { SectionHeading } from "@/components/shared/section-heading";

export default function MessagesPage() {
  return (
    <div className="space-y-4">
      <section className="panel rounded-[32px] p-6">
        <SectionHeading
          eyebrow="Messages"
          title="War-room threads and project chatter"
          description="Mock conversations keep the app feeling alive while remaining fully local and deterministic."
        />
      </section>
      <MessageOpsPanel />
      <MessageCenter />
    </div>
  );
}
