const bookings = [];

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const sessionId = document.getElementById('sessionId').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const duration = parseInt(document.getElementById('duration').value);
    const endTime = new Date(`${date}T${time}`);
    endTime.setMinutes(endTime.getMinutes() + duration);

    const booking = {
        sessionId,
        date,
        time,
        duration,
        endTime
    };

    const isConflict = bookings.some(b => {
        const bookedStartTime = new Date(`${b.date}T${b.time}`);
        const bookedEndTime = b.endTime;
        const newStartTime = new Date(`${date}T${time}`);

        return (
            (newStartTime >= bookedStartTime && newStartTime < bookedEndTime) ||
            (endTime > bookedStartTime && endTime <= bookedEndTime) ||
            (newStartTime <= bookedStartTime && endTime >= bookedEndTime)
        );
    });

    if (isConflict) {
        document.getElementById('message').textContent = 'الجلسة محجوزة في الوقت المحدد';
    } else {
        bookings.push(booking);
        document.getElementById('message').textContent = 'تم حجز الجلسة بنجاح';
        document.getElementById('bookingForm').reset();
    }
});
