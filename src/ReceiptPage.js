import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import hawraLogo from './assets/hawra-logo.png';
import jskaLogo from './assets/jska-logo.png';

const ReceiptPage = () => {
  const receiptRef = useRef(null);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const saveReceiptData = () => {
    const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
    receipts.push({ name, amount, date, timestamp: Date.now() });
    localStorage.setItem('receipts', JSON.stringify(receipts));
  };

  const handleDownload = () => {
    if (!receiptRef.current) return;
    saveReceiptData();
    toPng(receiptRef.current).then((dataUrl) => {
      download(dataUrl, `${name}_receipt.png`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Receipt Generator</h2>

      {/* Input Form */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          className="w-full mb-4 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 font-medium">Date</label>
        <input
          type="date"
          className="w-full mb-4 p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="block mb-2 font-medium">Amount</label>
        <input
          type="text"
          className="w-full mb-4 p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={() => setShowPreview(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Preview Receipt
        </button>
      </div>

      {/* Receipt Preview */}
      {showPreview && (
        <>
          <div className="w-full overflow-x-auto">
            <div
              ref={receiptRef}
              className="bg-[#fdf6e3] text-black border border-black w-[800px] max-w-full px-4 sm:px-6 py-4 font-sans text-sm leading-relaxed flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <img
                  src={hawraLogo}
                  alt="Left Logo"
                  className="h-10 w-10 object-cover rounded-full border"
                />
                <div className="text-center">
                  <h1 className="font-bold text-sm sm:text-base text-red-700">
                    HAWRA SPORTS HALL INTERNATIONAL
                  </h1>
                  <p className="text-xs sm:text-sm text-red-700">
                    SCHOOL OF MARTIAL ARTS
                  </p>
                </div>
                <img
                  src={jskaLogo}
                  alt="Right Logo"
                  className="h-10 w-10 object-cover rounded-full border"
                />
              </div>

              <hr className="border-black my-1" />

              <h2 className="text-center font-semibold text-md underline my-2">
                FEE RECEIPT
              </h2>

              {/* Sentence with wrapping */}
              <p className="text-sm mb-6 leading-relaxed text-justify flex flex-wrap items-center gap-2">
                Received from{' '}
                <span className="font-bold text-base border-b border-black px-2 inline-block min-w-[100px] text-center">
                  {name || ' '}
                </span>{' '}
                the amount of{' '}
                <span className="font-bold text-base border-b border-black px-2 inline-block min-w-[80px] text-center">
                  ₹{amount || ' '}
                </span>{' '}
                for monthly fee.
              </p>

              {/* Footer */}
              <div className="flex justify-between text-sm font-medium">
                <p><strong>Date:</strong> {date || '____-__-__'}</p>
                <p><strong>DOJO incharge:</strong> Pradeep Kumar P</p>
              </div>

              <hr className="border-black my-2" />
              <p className="text-xs text-center text-gray-600">
                This is a system-generated receipt. No signature required.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Download Receipt as Image
          </button>
        </>
      )}
    </div>
  );
};

export default ReceiptPage;
