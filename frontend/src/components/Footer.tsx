export default function Footer() {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold ">MernHolidays.com</span>
        <span className="text-white font-bold flex gap-2 trackling-tight">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms and conditions</p>
        </span>
      </div>
    </div>
  );
}
