import { useState } from "react";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { Proposal1 } from "@/components/Proposal1";
import { Proposal2 } from "@/components/Proposal2";
import { ROIImpact } from "@/components/ROIImpact";
import { ChatAssistant } from "@/components/ChatAssistant";
import { X } from "lucide-react";

export default function Index() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "proposal1":
        return <Proposal1 />;
      case "proposal2":
        return <Proposal2 />;
      case "roi":
        return <ROIImpact />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onChatToggle={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
      />
      
      {/* Main Content */}
      <main className={`pt-20 md:pt-16 pb-8 transition-all duration-300 ${isChatOpen ? 'mr-[380px]' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="py-4">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Chat Sidebar */}
      {isChatOpen && (
        <div className="fixed top-16 right-0 bottom-0 w-[380px] bg-card border-l border-border shadow-2xl z-40 animate-slide-in-right">
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div>
              <h3 className="font-semibold text-foreground">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask about ROI, proposals, data</p>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[calc(100%-73px)]">
            <ChatAssistant compact />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`border-t border-border bg-card py-4 transition-all duration-300 ${isChatOpen ? 'mr-[380px]' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
            <p>Data sourced from Yum China & Dicos case studies</p>
            <p>© 2026 AI Transcend × Fairwood Partnership Demo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}