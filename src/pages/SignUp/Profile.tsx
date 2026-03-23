import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";

// profile schema
const profileSchema = z.object({
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  gender: z
    .string("Full name is required")
    .trim()
    .min(1, { message: "Gender is required" }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
  address: z.string().trim().min(1, { message: "Address is required" }),
});

type ProfileForm = z.infer<typeof profileSchema>;

function Profile() {
  const navigate = useNavigate();

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // privacy checkbox
  const [checked, setChecked] = useState(false);

  // error states
  const [errors, setErrors] = useState<ProfileForm>({
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
  });

  const handleContinue = () => {
    const result = profileSchema.safeParse({
      dateOfBirth,
      gender,
      phoneNumber,
      address,
    });
    if (result.success) {
      setErrors({
        dateOfBirth: "",
        gender: "",
        phoneNumber: "",
        address: "",
      });
      navigate("/authentication");
      return;
    }

    // Auto-map errors
    const newErrors: ProfileForm = {
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      address: "",
    };

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof ProfileForm;
      newErrors[field] = issue.message;
    });

    setErrors(newErrors);
  };

  // Automatically clear a field's error as user types

  const handleChange =
    (field: keyof ProfileForm, setter: (val: string) => void) =>
    (value: string) => {
      setter(value);
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  return (
    <div className="flex flex-col gap-4">
      {/* date of birth */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium" htmlFor="dateOfBirth">
          Date of Birth
        </Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) =>
            handleChange("dateOfBirth", setDateOfBirth)(e.target.value)
          }
          className={`p-2 border border-gray-400 rounded focus:border-b-gray-500 ${
            errors.dateOfBirth ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.dateOfBirth && (
          <span className="text-red-500 text-xs">{errors.dateOfBirth}</span>
        )}
      </div>

      {/* gender */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium" htmlFor="gender">
          Gender
        </Label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => handleChange("gender", setGender)(e.target.value)}
          className={`p-2 border border-gray-400 rounded focus:border-b-gray-500 w-full text-sm ${
            errors.gender ? "border-red-500" : "border-gray-400"
          }`}
        >
          <option value="" disabled>
            Select gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && (
          <span className="text-red-500 text-xs">{errors.gender}</span>
        )}
      </div>

      {/* phone number */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium" htmlFor="phoneNumber">
          Phone Number
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="080********"
          value={phoneNumber}
          onChange={(e) =>
            handleChange(
              "phoneNumber",
              setPhoneNumber
            )(e.target.value.replace(/\D/g, ""))
          }
          className={`p-2 border border-gray-400 rounded focus:border-b-gray-500 ${
            errors.phoneNumber ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.phoneNumber && (
          <span className="text-red-500 text-xs">{errors.phoneNumber}</span>
        )}
      </div>

      {/* address */}
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium" htmlFor="address">
          Address
        </Label>
        <textarea
          id="address"
          rows={3}
          placeholder="Enter your address"
          value={address}
          onChange={(e) => handleChange("address", setAddress)(e.target.value)}
          className={`p-2 border border-gray-400 rounded focus:border-b-gray-500 ${
            errors.address ? "border-red-500" : "border-gray-400"
          }`}
        />
        {errors.address && (
          <span className="text-red-500 text-xs">{errors.address}</span>
        )}
      </div>

      {/* privacy setting checkbox */}
      <div
        className="flex items-center gap-2 text-sm cursor-pointer"
        onClick={() => setChecked(!checked)}
      >
        <div
          className={`w-4 h-4 flex items-center justify-center border transition-all ${
            checked
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-400"
          }`}
        >
          {checked && <Check size={10} strokeWidth={3} />}
        </div>

        <span className={checked ? "text-green-600" : "text-black"}>
          Privacy Settings
          <span
            className={`block text-xs ${
              checked ? "text-green-600" : "text-gray-600"
            }`}
          >
            Allow my profile to be discoverable by providers
          </span>
        </span>
      </div>

      <Button
        type="button"
        onClick={handleContinue}
        className="w-full bg-blue-500 text-white font-semibold p-5 rounded hover:bg-green-200/90 hover:text-green-700"
      >
        Complete Profile
      </Button>
    </div>
  );
}

export default Profile;
