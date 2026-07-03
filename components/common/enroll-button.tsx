"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface EnrollButtonProps {
  courseId: string;
  isEnrolled: boolean;
  onEnrollChange: (enrolled: boolean) => void;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
}

export function EnrollButton({
  courseId,
  isEnrolled,
  onEnrollChange,
  size = "default",
  variant = "default",
}: EnrollButtonProps) {
  const [enrolled, setEnrolled] = useState(isEnrolled);

  const enrollMutation = useMutation({
    mutationFn: async () => {
      const method = enrolled ? "DELETE" : "POST";
      const res = await fetch(`/api/courses/${courseId}/enroll`, {
        method,
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to update enrollment");
      return res.json();
    },
    onSuccess: () => {
      const newEnrolled = !enrolled;
      setEnrolled(newEnrolled);
      onEnrollChange(newEnrolled);
    },
  });

  return (
    <Button
      size={size}
      variant={enrolled ? "outline" : variant}
      onClick={() => enrollMutation.mutate()}
      disabled={enrollMutation.isPending}
      className={
        !enrolled
          ? "bg-purple-600 hover:bg-purple-700 text-white"
          : undefined
      }
    >
      {enrollMutation.isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : enrolled ? (
        "Unenroll"
      ) : (
        "Enroll Now"
      )}
    </Button>
  );
}
