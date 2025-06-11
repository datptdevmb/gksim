import ButtonApp from "@/components/Button/ButtonApp";
import {
    statusColor,
    cardBaseClass,
    labelClass,
    codeClass,
    badgeClass,
} from "./BookingCard.config";

export default function BookingCard({ booking, onClick }) {
    return (
        <div className={cardBaseClass}>
            <div className="flex justify-between items-center mb-2">
                <p className={codeClass}>Mã đặt lịch: {booking.code}</p>
                <span className={`${badgeClass} ${statusColor[booking.status]}`}>
                    {booking.status}
                </span>
            </div>

            <p className={labelClass}>
                Người đặt: <b>{booking.name}</b>
            </p>
            <p className={labelClass}>Thời gian đặt: {booking.time}</p>
            <p className={`${labelClass} mb-2`}>Ngày tạo: {booking.date}</p>

            <ButtonApp
                onClick={onClick}
                title="Xem chi tiết đặt lịch"
                gradient
                rounded
                fullWidth
                size="md"
            />
        </div>
    );
}
