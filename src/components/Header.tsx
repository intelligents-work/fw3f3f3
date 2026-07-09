import { User, MessageCircle } from "lucide-react";
import fairwoodLogo from "@/assets/fairwood-logo.png";
import aiTranscendLogo from "@/assets/ai-transcend-logo.png";
interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onChatToggle?: () => void;
  isChatOpen?: boolean;
}
const tabs = [{
  id: "dashboard",
  label: "Dashboard"
}, {
  id: "proposal1",
  label: "Personalization"
}, {
  id: "proposal2",
  label: "Retention"
}];
export function Header({
  activeTab,
  onTabChange,
  onChatToggle,
  isChatOpen
}: HeaderProps) {
  return <header className="fixed top-0 left-0 right-0 z-50 header-bar">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Fairwood style */}
          <div className="flex items-center gap-4">
            <img src={fairwoodLogo} alt="Fairwood" className="h-10 w-auto object-contain" />
            <div className="hidden sm:block h-8 w-px bg-border" />
            
          </div>

          {/* Navigation Tabs - Fairwood rounded style */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-full">
            {tabs.map(tab => <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground hover:bg-white/50"}`}>
                {tab.label}
              </button>)}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Chat Toggle */}
            <button onClick={onChatToggle} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isChatOpen ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'}`}>
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">Demo User</p>
                <p className="text-xs text-muted-foreground">Fairwood HK</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <User className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {tabs.map(tab => <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"}`}>
              {tab.label}
            </button>)}
        </nav>
      </div>
    </header>;
}