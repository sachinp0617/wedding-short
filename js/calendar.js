function formatICSDateLocal(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}00`
  );
}

function downloadICS(filename, content) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildICS(event) {
  const start = new Date(`${event.date}T${event.time}:00`);
  const end = new Date(start.getTime() + (event.durationHours || 3) * 60 * 60 * 1000);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Reception Invitation//EN",
    "BEGIN:VEVENT",
    `DTSTART:${formatICSDateLocal(start)}`,
    `DTEND:${formatICSDateLocal(end)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.venue}, ${event.address}`,
    `DESCRIPTION:${event.title} - Reception celebration`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

export function initCalendar(events) {
  document.querySelectorAll("[data-calendar]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-calendar");
      const event = events.find((e) => e.id === id);
      if (!event) return;
      const ics = buildICS(event);
      downloadICS(`${event.id}-reception.ics`, ics);
    });
  });
}
