export const formatMessageTime = (dateString: string) => {
  const inputDate = new Date(dateString);
  const now = new Date();

  // FIXME
  const inputDateOnly: any = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );
  const nowDateOnly: any = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const diffTime = nowDateOnly - inputDateOnly;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  const timePart = inputDate.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDays === 0) {
    return `Сегодня, ${timePart}`;
  } else if (diffDays === 1) {
    return `Вчера, ${timePart}`;
  } else {
    const datePart = inputDate.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return `${datePart} ${timePart}`;
  }
};
