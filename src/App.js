import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function ProductEntryForm() {
  const [product, setProduct] = useState("");
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [link, setLink] = useState("");

  const products = ["Đậu phộng (Lạc) tươi", "Cà rốt", "Xà lách"];
  const locations = ["Đức Trọng - Lâm Đồng", "Đà Lạt - Lâm Đồng"];

  const handleSubmit = () => {
    if (product && date && location) {
      const uniqueLink = `/data/${btoa(`${product}-${date}-${location}`)}`;
      setLink(uniqueLink);
      setSubmitted(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 w-96">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Nhập thông tin sản phẩm</h2>
          <Select onValueChange={setProduct} placeholder="Chọn sản phẩm">
            {products.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <DatePicker selected={date} onSelect={setDate} className="mt-4" />

          <Select onValueChange={setLocation} placeholder="Chọn nơi trồng" className="mt-4">
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </Select>

          <Button onClick={handleSubmit} className="mt-4 w-full">
            Gửi thông tin
          </Button>

          {submitted && (
            <div className="mt-4 text-blue-600">
              Link dữ liệu: <Link to={link}>{link}</Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function DataPage({ data }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 w-96">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Thông tin đã nhập</h2>
          <p>{atob(data)}</p>
          <Link to="/" className="text-blue-600">Quay lại</Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductEntryForm />} />
        <Route path="/data/:encodedData" element={<DataPage />} />
      </Routes>
    </Router>
  );
}
