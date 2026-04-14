import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    updatedAt: "2026-04-14T11:30:00+07:00",
    items: [
      {
        id: "1",
        category: "Dining",
        cardName: "KBank The Wisdom",
        bank: "Kasikornbank",
        bankLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kasikornbank_logo.svg/512px-Kasikornbank_logo.svg.png",
        brand: "Starbucks",
        location: "Bangkok",
        benefit: "รับส่วนลด 10% สำหรับเครื่องดื่มที่ร่วมรายการ",
        pricing: "free",
        promoUrl: "https://www.kasikornbank.com",
        isActive: true,
      },
      {
        id: "2",
        category: "Travel",
        cardName: "SCB M LIVE Visa",
        bank: "SCB",
        bankLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Siam_Commercial_Bank.svg/512px-Siam_Commercial_Bank.svg.png",
        brand: "Airport Lounge",
        location: "Suvarnabhumi",
        benefit: "เข้าใช้เลานจ์ฟรี 2 ครั้ง/ปี",
        pricing: "free",
        promoUrl: "https://www.scb.co.th",
        isActive: true,
      },
      {
        id: "3",
        category: "Shopping",
        cardName: "KTC Visa Signature",
        bank: "KTC",
        bankLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Krungthai_Card_logo.svg/512px-Krungthai_Card_logo.svg.png",
        brand: "Central",
        location: "Nationwide",
        benefit: "รับเครดิตเงินคืน 5% เมื่อช้อปครบตามเงื่อนไข",
        pricing: "free",
        promoUrl: "https://www.ktc.co.th",
        isActive: true,
      },
      {
        id: "4",
        category: "Wellness",
        cardName: "UOB พรีเมียร์",
        bank: "UOB",
        bankLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/UOB_logo.svg/512px-UOB_logo.svg.png",
        brand: "Let's Relax Spa",
        location: "Phuket",
        benefit: "ซื้อแพ็กเกจนวดราคาพิเศษสำหรับผู้ถือบัตร",
        pricing: "paid",
        promoUrl: "https://www.uob.co.th",
        isActive: true,
      },
      {
        id: "5",
        category: "Dining",
        cardName: "Krungsri JCB Platinum",
        bank: "Krungsri",
        bankLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Bank_of_Ayudhya_logo.svg/512px-Bank_of_Ayudhya_logo.svg.png",
        brand: "Sushi Hiro",
        location: "Bangkok",
        benefit: "รับเมนูพิเศษเมื่อใช้จ่ายครบตามกำหนด",
        pricing: "free",
        promoUrl: "https://www.krungsri.com",
        isActive: true,
      },
      {
        id: "6",
        category: "Lifestyle",
        cardName: "Bangkok Bank AirAsia",
        bank: "Bangkok Bank",
        bankLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Bangkok_Bank_logo.svg/512px-Bangkok_Bank_logo.svg.png",
        brand: "Major Cineplex",
        location: "Chiang Mai",
        benefit: "ซื้อตั๋วหนังราคาพิเศษวันศุกร์",
        pricing: "paid",
        promoUrl: "https://www.bangkokbank.com",
        isActive: true,
      },
      {
        id: "7",
        category: "Travel",
        cardName: "Citi พรีเมียร์",
        bank: "Citi",
        bankLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Citi.svg/512px-Citi.svg.png",
        brand: "Hotels.com",
        location: "Online",
        benefit: "รับส่วนลดการจองโรงแรมผ่านลิงก์เฉพาะ",
        pricing: "free",
        promoUrl: "https://www.citibank.co.th",
        isActive: true,
      },
      {
        id: "8",
        category: "Shopping",
        cardName: "ttb reserve infinite",
        bank: "ttb",
        bankLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/TMBThanachart_logo.svg/512px-TMBThanachart_logo.svg.png",
        brand: "Siam Paragon",
        location: "Bangkok",
        benefit: "สิทธิ์จอดรถเพิ่มและสิทธิพิเศษร้านค้าที่ร่วมรายการ",
        pricing: "free",
        promoUrl: "https://www.ttbbank.com",
        isActive: true,
      },
    ],
  };

  return NextResponse.json(data);
}
