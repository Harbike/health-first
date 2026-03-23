import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { z, ZodError } from "zod";
import { useState } from "react";

// set basic-info schema
const basicInfoSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .email({ message: "Invalid email address" }),
});

type BasicInfoForm = z.infer<typeof basicInfoSchema>;

function BasicInfo() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<BasicInfoForm>({
    fullName: "",
    email: "",
  });

  const handleContinue = () => {
    // Validate using Zod schema
    try {
      basicInfoSchema.parse({ fullName, email }); // throws if invalid
      setErrors({ fullName: "", email: "" });
      navigate("/signup/password");
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        // Auto-map errors
        const fieldErrors: Record<keyof BasicInfoForm, string> = {
          fullName: "",
          email: "",
        };

        err.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof BasicInfoForm;
          fieldErrors[fieldName] = issue.message;
        });

        setErrors(fieldErrors);
      }
    }
  };

  // Automatically clear a field's error as user types
  const handleFullNameChange = (value: string) => {
    setFullName(value);
    if (errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: "" }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* fullname */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium" htmlFor="fullName">
          Full Name
        </Label>
        <Input
          id="fullName"
          type="text"
          value={fullName}
          placeholder="Enter your full name"
          onChange={(e) => handleFullNameChange(e.target.value)}
          className={`p-2 border border-gray-400 rounded focus:border-b-gray-500 ${
            errors.fullName ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.fullName && (
          <span className="text-red-500 text-xs">{errors.fullName}</span>
        )}
      </div>

      {/* email */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => handleEmailChange(e.target.value)}
          className={`border border-gray-400 rounded focus:border-b-gray-500 ${
            errors.email ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email}</span>
        )}
      </div>

      <Button
        onClick={handleContinue}
        type="button"
        className="bg-blue-500 text-white font-semibold p-5 rounded hover:bg-green-200/90 hover:text-green-700"
      >
        Continue
      </Button>

      {/* Log in prompt */}
      <div className="text-center text-xs">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="text-blue-600 hover:underline hover:text-green-700"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}

export default BasicInfo;
