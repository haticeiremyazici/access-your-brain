import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Copy, Check, RotateCcw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const SimplifyForm = () => {
  const [inputText, setInputText] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSimplify = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to simplify.");
      return;
    }

    setIsLoading(true);
    setSimplifiedText("");

    try {
      const { data, error } = await supabase.functions.invoke("gemini", {
        body: {
          messages: [
            {
              role: "system",
              content: `You are an accessibility assistant that helps people with cognitive disabilities understand complex text. Your job is to simplify the given text using:
- Very short, clear sentences (max 10-15 words each)
- Simple, everyday words (avoid jargon or technical terms)
- Bullet points for lists or multiple ideas
- Bold key terms when helpful
- A brief summary at the top

Always be kind, respectful, and assume the reader is intelligent but prefers plain language.`,
            },
            {
              role: "user",
              content: `Please simplify this text:\n\n${inputText}`,
            },
          ],
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to simplify text");
      }

      setSimplifiedText(data.response);
    } catch (e) {
      console.error("Simplification error:", e);
      toast.error(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(simplifiedText);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputText("");
    setSimplifiedText("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <div className="space-y-3">
        <label
          htmlFor="input-text"
          className="block text-sm font-medium text-muted-foreground tracking-wide uppercase"
        >
          Paste complex text here
        </label>
        <Textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste a paragraph, legal text, medical instructions, or anything you'd like simplified…"
          className="min-h-[160px] text-base leading-relaxed bg-card border-border focus:ring-2 focus:ring-primary/30 resize-y"
          disabled={isLoading}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleSimplify}
          disabled={isLoading || !inputText.trim()}
          size="lg"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Simplifying…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Simplify Text
            </>
          )}
        </Button>

        {(inputText || simplifiedText) && (
          <Button
            onClick={handleReset}
            variant="ghost"
            size="lg"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Output Section */}
      {simplifiedText && (
        <div className="relative rounded-xl border border-secondary/30 bg-secondary/5 p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-secondary tracking-wide uppercase flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Simplified Version
            </h2>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="gap-2 text-xs border-secondary/30 hover:bg-secondary/10"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="prose prose-sm max-w-none text-foreground leading-relaxed [&_li]:my-1 [&_ul]:space-y-1 [&_p]:mb-3 [&_strong]:text-primary">
            <ReactMarkdown>{simplifiedText}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplifyForm;
