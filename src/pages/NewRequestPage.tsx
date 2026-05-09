import ServiceWizard from "../components/ServiceWizard";


interface NewRequestPageProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function NewRequestPage({ onBack, onComplete }: NewRequestPageProps) {
  return (
    <div className="relative">
      <ServiceWizard 
        onComplete={() => {
          onComplete();
        }}
        onCancel={onBack}
      />
    </div>
  );
}