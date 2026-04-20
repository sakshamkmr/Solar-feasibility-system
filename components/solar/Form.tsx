"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sun, MapPin, UploadCloud, Image as ImageIcon, X } from "lucide-react";

export function SolarForm({ 
  formData, 
  setFormData, 
  loading, 
  onCalculate,
  className = "" 
}) {
  const discoms = ["TANGEDCO", "TSSPDCL", "MSEDCL", "BSES", "TPDDL", "Torrent Power", "Adani", "GESCOM"];

  const [isDragging, setIsDragging] = useState(false);
  const [imageConfirmed, setImageConfirmed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [formConfirmed, setFormConfirmed] = useState(false);
  const [showFormWarning, setShowFormWarning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => setIsDragging(false);
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
       const reader = new FileReader();
       reader.onloadend = () => {
           setFormData({ ...formData, rooftopImage: reader.result as string });
       };
       reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
         const reader = new FileReader();
         reader.onloadend = () => {
             setFormData({ ...formData, rooftopImage: reader.result as string });
         };
         reader.readAsDataURL(file);
      }
    }
  };

  const clearImage = () => {
    setFormData({ ...formData, rooftopImage: null });
    setImageConfirmed(false);
    setShowWarning(false);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleCalculateClick = (e: React.MouseEvent) => {
    let hasError = false;

    if (formData.rooftopImage && !imageConfirmed) {
      setShowWarning(true);
      hasError = true;
    } else {
      setShowWarning(false);
    }

    if (!formConfirmed) {
      setShowFormWarning(true);
      hasError = true;
    } else {
      setShowFormWarning(false);
    }

    if (hasError) {
      e.preventDefault();
      return;
    }

    onCalculate();
  };

  return (
    <Card className={`shadow-2xl border-0 bg-white/90 backdrop-blur-xl text-slate-900 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-3xl font-black text-slate-900">
          <MapPin className="w-8 h-8 text-orange-500" />
          Property Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {/* Address + PIN */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-xl font-bold text-slate-900">Full Address</Label>
            <Input
              id="address"
              placeholder="House number, street, locality..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="h-14 text-lg text-slate-900 font-medium border-slate-300 placeholder:text-slate-400 bg-white/50"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xl font-bold text-slate-900">PIN Code</Label>
            <Input
              id="pincode"
              placeholder="600001"
              maxLength={6}
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className="h-14 text-lg text-slate-900 font-medium border-slate-300 placeholder:text-slate-400 bg-white/50"
              required
            />
          </div>
        </div>

        {/* Roof + Usage */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-lg font-bold text-slate-900">Roof Area (sqm)</Label>
            <Input
              id="roofArea"
              type="number"
              placeholder="100"
              value={formData.roofArea}
              onChange={(e) => setFormData({ ...formData, roofArea: e.target.value })}
              className="h-12 text-slate-900 font-medium border-slate-300 placeholder:text-slate-400 bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-lg font-bold text-slate-900">Daily Usage (kWh)</Label>
            <Input
              id="dailyUsage"
              type="number"
              placeholder="15"
              value={formData.dailyUsage}
              onChange={(e) => setFormData({ ...formData, dailyUsage: e.target.value })}
              className="h-12 text-slate-900 font-medium border-slate-300 placeholder:text-slate-400 bg-white/50"
            />
            <p className="text-xs text-slate-600 font-medium">AC + appliances daily consumption</p>
          </div>
        </div>

        {/* DISCOM + Building Type */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-lg font-bold text-slate-900">DISCOM</Label>
            <Select value={formData.discom} onValueChange={(v) => setFormData({ ...formData, discom: v })}>
              <SelectTrigger className="h-12 text-slate-900 font-medium border-slate-300 bg-white/50">
                <SelectValue placeholder="Select DISCOM" />
              </SelectTrigger>
              <SelectContent>
                {discoms.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-lg font-bold text-slate-900">Building Type</Label>
            <Select value={formData.buildingType} onValueChange={(v) => setFormData({ ...formData, buildingType: v })}>
              <SelectTrigger className="h-12 text-slate-900 font-medium border-slate-300 bg-white/50">
                <SelectValue placeholder="Residential / Commercial" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">🏠 Residential</SelectItem>
                <SelectItem value="commercial">🏢 Commercial</SelectItem>
                <SelectItem value="industrial">🏭 Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Roof Orientation + Tilt */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-lg font-bold text-slate-900">Roof Facing</Label>
            <Select value={formData.roofOrientation} onValueChange={(v) => setFormData({ ...formData, roofOrientation: v })}>
              <SelectTrigger className="h-12 text-slate-900 font-medium border-slate-300 bg-white/50">
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="south">South (Optimal ☀️)</SelectItem>
                <SelectItem value="east-west">East-West (Good)</SelectItem>
                <SelectItem value="north">North (Poor)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-lg font-bold text-slate-900">Roof Tilt (°)</Label>
            <Input
              id="roofTilt"
              type="number"
              placeholder="15"
              max="60"
              min="0"
              value={formData.roofTilt}
              onChange={(e) => setFormData({ ...formData, roofTilt: e.target.value })}
              className="h-12 text-slate-900 font-medium border-slate-300 placeholder:text-slate-400 bg-white/50"
            />
          </div>
        </div>

        {/* Shadows */}
        <div className="space-y-3">
          <Label className="text-xl font-bold text-slate-900">Shadow Analysis</Label>
          <div className="space-y-3 p-6 border-2 border-dashed border-orange-200 rounded-2xl bg-orange-50/50">
            <div className="flex items-center space-x-3 p-4 bg-white/70 rounded-xl hover:bg-white transition-all">
              <Checkbox 
                id="trees"
                checked={formData.shadows.trees}
                onCheckedChange={(checked) => setFormData({
                  ...formData,
                  shadows: { ...formData.shadows, trees: checked }
                })}
              />
              <Label htmlFor="trees" className="cursor-pointer flex items-center gap-2 text-lg font-bold text-slate-900">
                🌳 Nearby trees
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/70 rounded-xl hover:bg-white transition-all">
              <Checkbox 
                id="buildings"
                checked={formData.shadows.buildings}
                onCheckedChange={(checked) => setFormData({
                  ...formData,
                  shadows: { ...formData.shadows, buildings: checked }
                })}
              />
              <Label htmlFor="buildings" className="cursor-pointer flex items-center gap-2 text-lg font-bold text-slate-900">
                🏢 Tall buildings
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/70 rounded-xl hover:bg-white transition-all">
              <Checkbox 
                id="chimneys"
                checked={formData.shadows.chimneys}
                onCheckedChange={(checked) => setFormData({
                  ...formData,
                  shadows: { ...formData.shadows, chimneys: checked }
                })}
              />
              <Label htmlFor="chimneys" className="cursor-pointer flex items-center gap-2 text-lg font-bold text-slate-900">
                🏭 Chimneys/Antenna
              </Label>
            </div>
          </div>
        </div>

        {/* Upload Rooftop Image */}
        <div className="space-y-3">
          <Label className="text-xl font-bold text-slate-900">Upload Rooftop Image (Optional)</Label>
          <p className="text-sm text-slate-600 font-medium">Upload a rooftop/satellite image for AI analysis or record keeping. <strong className="text-orange-600">The uploaded rooftop image must match the address provided below, otherwise results may be incorrect.</strong></p>
          
          {!formData.rooftopImage ? (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isDragging ? "border-orange-500 bg-orange-50/50" : "border-slate-300 bg-white/50 hover:bg-orange-50/30 hover:border-orange-300"}`}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept=".jpg,.jpeg,.png"
                onChange={handleImageUpload}
              />
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-500">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-lg font-bold text-slate-900 mb-1">Click or drag & drop</p>
              <p className="text-sm text-slate-500 font-medium">.jpg, .jpeg, .png</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative border-2 border-orange-200 rounded-2xl overflow-hidden bg-white group">
                <img src={formData.rooftopImage} alt="Rooftop preview" className="w-full h-56 object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-5">
                   <div className="flex items-center text-white font-medium">
                     <ImageIcon className="w-5 h-5 mr-2 text-orange-400" /> Rooftop Image Selected
                   </div>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); clearImage(); }} 
                  className="absolute top-4 right-4 rounded-full flex items-center justify-center w-10 h-10 p-0 shadow-lg hover:scale-110 transition-transform bg-red-500 hover:bg-red-600 border-0"
                >
                  <X className="w-5 h-5 text-white" />
                </Button>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-orange-50/80 rounded-xl border border-orange-200">
                <Checkbox 
                  id="imageConfirm" 
                  checked={imageConfirmed} 
                  onCheckedChange={(checked) => {
                    setImageConfirmed(checked as boolean);
                    if (checked) setShowWarning(false);
                  }}
                  className="mt-1 border-orange-400 data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
                />
                <div className="space-y-1.5 leading-none">
                  <Label htmlFor="imageConfirm" className="cursor-pointer text-sm font-bold text-slate-900 select-none">
                    I confirm this rooftop image belongs to the address entered below.
                  </Label>
                  {showWarning && (
                    <p className="text-sm font-bold text-red-500 animate-pulse">
                      ⚠️ Please confirm the image matches the address to continue.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label className="text-lg font-bold text-slate-900">Additional Notes</Label>
          <Textarea
            placeholder="Roof material, structural concerns, special requirements..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="h-28 resize-none text-slate-900 font-medium border-slate-300 placeholder:text-slate-400 bg-white/50"
          />
        </div>

        {/* Form Confirmation */}
        <div className="flex items-start space-x-3 p-4 bg-slate-50/80 rounded-xl border border-slate-200">
          <Checkbox 
            id="formConfirm" 
            checked={formConfirmed} 
            onCheckedChange={(checked) => {
              setFormConfirmed(checked as boolean);
              if (checked) setShowFormWarning(false);
            }}
            className="mt-1 border-slate-400 data-[state=checked]:bg-slate-900 data-[state=checked]:text-white"
          />
          <div className="space-y-1.5 leading-none">
            <Label htmlFor="formConfirm" className="cursor-pointer text-sm font-bold text-slate-900 select-none">
              I confirm that all the information entered in this form is accurate.
            </Label>
            {showFormWarning && (
              <p className="text-sm font-bold text-red-500 animate-pulse">
                ⚠️ Please confirm to continue.
              </p>
            )}
          </div>
        </div>

        {/* Calculate Button */}
        <Button 
          onClick={handleCalculateClick}
          disabled={loading || !formData.address || !formData.pincode}
          className="w-full h-16 text-xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 
                     hover:from-orange-600 hover:to-yellow-600 shadow-2xl border-0"
        >
          {loading ? (
            <span className="flex items-center gap-3">
              <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
              Calculating Solar Potential...
            </span>
          ) : (
            <>
              <Sun className="w-7 h-7 mr-3" />
              Calculate My Solar Savings
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
