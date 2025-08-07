// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Atlas'a bağlanıldı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Müşteri şeması
const customerSchema = new mongoose.Schema({
  company_name: String,
  contact_name: String,
  email: String,
  phone: String,
  address: String,
  tax_number: String,
  created_at: String,
  updated_at: String,
});

const Customer = mongoose.model("Customer", customerSchema);

// Müşteri ekleme endpoint'i
app.post("/api/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({ message: "Müşteri kaydedildi", customer });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`));
