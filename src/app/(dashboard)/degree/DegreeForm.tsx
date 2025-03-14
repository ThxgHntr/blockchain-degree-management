import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UploadFile from "./UploadFile";
import SearchStudent from "./SearchStudent";
import { Label } from "@/components/ui/label";
import { validateEmail, validateRequired } from "@/lib/validate";

interface DegreeFormProps {
  id: string;
  setID: (id: string) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  degreeName: string;
  setDegreeName: (name: string) => void;
  issuer: string;
  setIssuer: (issuer: string) => void;
  ifpsHash: string;
  setIfpsHash: (hash: string) => void;
  ifpsUrl: string;
  setIfpsUrl: (url: string) => void;
  addRecord: (event: React.FormEvent) => void;
}

const DegreeForm: React.FC<DegreeFormProps> = ({
  id,
  setID,
  studentName,
  setStudentName,
  email,
  setEmail,
  issuer,
  setIssuer,
  degreeName,
  setDegreeName,
  ifpsHash,
  setIfpsHash,
  ifpsUrl,
  setIfpsUrl,
  addRecord,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!validateRequired(studentName)) {
      newErrors.studentName = "Name is required";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!validateRequired(id)) {
      newErrors.id = "Degree ID is required";
    }
    if (!validateRequired(degreeName)) {
      newErrors.degreeName = "Degree name is required";
    }
    if (!validateRequired(issuer)) {
      newErrors.issuer = "Issuer is required";
    }
    if (!validateRequired(ifpsHash)) {
      newErrors.ifpsHash = "IFPS Hash is required";
    }
    if (!validateRequired(ifpsUrl)) {
      newErrors.ifpsUrl = "IFPS URL is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      addRecord(event);
    }
  };

  const handleClear = () => {
    setID("");
    setStudentName("");
    setEmail("");
    setDegreeName("");
    setIssuer("");
    setIfpsHash("");
    setIfpsUrl("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SearchStudent setStudentName={setStudentName} setEmail={setEmail} />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="studentName">Name</Label>
        <Input
          id="studentName"
          type="text"
          placeholder="Name"
          value={studentName || ""}
          onChange={(e) => setStudentName(e.target.value)}
          readOnly
        />
        {errors.studentName && <p className="text-red-500">{errors.studentName}</p>}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          readOnly
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="degreeId">Degree ID</Label>
        <Input
          id="degreeId"
          type="text"
          placeholder="Degree ID"
          value={id || ""}
          onChange={(e) => setID(e.target.value)}
        />
        {errors.id && <p className="text-red-500">{errors.id}</p>}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="degreeName">Degree name</Label>
        <Input
          id="degreeName"
          type="text"
          placeholder="Degree name"
          value={degreeName || ""}
          onChange={(e) => setDegreeName(e.target.value)}
        />
        {errors.degreeName && <p className="text-red-500">{errors.degreeName}</p>}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="issuer">Issuer</Label>
        <Input
          id="issuer"
          type="text"
          placeholder="Issuer"
          value={issuer || ""}
          onChange={(e) => setIssuer(e.target.value)}
        />
        {errors.issuer && <p className="text-red-500">{errors.issuer}</p>}
      </div>
      <UploadFile setIfpsHash={setIfpsHash} setIfpsUrl={setIfpsUrl} />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="ifpsHash">IFPS Hash</Label>
        <Input
          id="ifpsHash"
          type="text"
          placeholder="IFPS Hash"
          value={ifpsHash || ""}
          onChange={(e) => setIfpsHash(e.target.value)}
          readOnly
        />
        {errors.ifpsHash && <p className="text-red-500">{errors.ifpsHash}</p>}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="ifpsUrl">IFPS URL</Label>
        <Input
          id="ifpsUrl"
          type="text"
          placeholder="IFPS URL"
          value={ifpsUrl || ""} 
          onChange={(e) => setIfpsUrl(e.target.value)}
          readOnly
        />
        {errors.ifpsUrl && <p className="text-red-500">{errors.ifpsUrl}</p>}
      </div>
      <div className="flex space-x-2">
        <Button className="bg-blue-500 text-white p-2 rounded-md mt-2" type="submit">
          Add degree
        </Button>
        <Button className="bg-gray-500 text-white p-2 rounded-md mt-2" type="button" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </form>
  );
};

export default DegreeForm;