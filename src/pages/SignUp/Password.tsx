import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import PasswordRule from "@/components/PasswordRule";

// password schema
const passwordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),

    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

function Password() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<PasswordForm>({
    password: "",
    confirmPassword: "",
  });

  
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  //     VALIDATE ON CONTINUE
  const handleContinue = () => {
    const result = passwordSchema.safeParse({ password, confirmPassword });

    if (result.success) {
      setErrors({ password: "", confirmPassword: "" });
      return navigate("/signup/profile");
    }

    const newErrors: PasswordForm = { password: "", confirmPassword: "" };

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof PasswordForm;
      newErrors[field] = issue.message;
    });

    setErrors(newErrors);
  };

  //     CLEAR ERRORS ON TYPING
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleConfirmChange = (value: string) => {
    setConfirmPassword(value);
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  return (
    <div className=" flex flex-col gap-5">
      {/* password */}
      <div className="space-y-2">
        <Label className="text-sm font-medium" htmlFor="password">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="*******"
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={`pr-10 border rounded focus:border-b-gray-500 ${
              errors.password ? "border-red-500" : "border-gray-400"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className=" absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password}</span>
        )}

        {/* Password hints */}
        <div className="space-y-1 mt-1">
          {/* Rule item */}
          <PasswordRule checked={rules.length} label="At least 8 characters" />
          <PasswordRule
            checked={rules.uppercase}
            label="One uppercase letter"
          />
          <PasswordRule checked={rules.number} label="One number" />
        </div>
      </div>

      {/* confirm password */}
      <div className="space-y-2">
        <Label className="text-sm font-medium" htmlFor="confirm-password">
          Confirm Password
        </Label>
        <Input
          type="password"
          value={confirmPassword}
          placeholder="*******"
          onChange={(e) => handleConfirmChange(e.target.value)}
          className={`border rounded focus:border-b-gray-500 ${
            errors.confirmPassword ? "border-red-500" : "border-gray-400"
          }`}
        />

        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">{errors.confirmPassword}</span>
        )}
      </div>

      {/* continue button */}
      <Button
        type="button"
        onClick={handleContinue}
        className="w-full bg-blue-500 text-white font-semibold p-5 mb-2 rounded hover:bg-green-200/90 hover:text-green-700"
      >
        Continue
      </Button>
    </div>
  );
}

export default Password;
