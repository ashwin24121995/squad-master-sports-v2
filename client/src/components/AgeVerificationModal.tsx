import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const hasVerified = localStorage.getItem("ageVerified");
    if (!hasVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("ageVerified", "true");
    setIsOpen(false);
  };

  const handleDecline = () => {
    // Redirect to a safe page or show message
    window.location.href = "https://www.google.com";
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Age Verification Required</DialogTitle>
          <DialogDescription className="text-center space-y-4 pt-4">
            <p className="text-base">
              You must be <strong>18 years or older</strong> to access StrikePlay.
            </p>
            <div className="bg-muted p-4 rounded-lg text-left">
              <p className="text-sm font-semibold mb-2">⚠️ Important Notice:</p>
              <p className="text-sm">
                StrikePlay is a <strong>free entertainment platform</strong> with no real money, 
                gambling, or betting involved. It's purely for cricket fun and entertainment.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              By clicking "I am 18+", you confirm that you meet the age requirement and agree to our{" "}
              <a href="/terms-of-service" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button onClick={handleConfirm} className="w-full" size="lg">
            I am 18 or Older
          </Button>
          <Button onClick={handleDecline} variant="outline" className="w-full" size="lg">
            I am Under 18
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
