export default function buildMessage(field, car) {
  const friendlyNames = {
    next_oil_change: "Oil change",
    next_tire_replacement: "Tire replacement",
    next_brake_service: "Brake service",
    next_coolant_change: "Coolant change",
    next_transmission_service: "Transmission service",
    next_general_checkup: "General checkup",
    orCr_Exp: "OR/CR expiration",
    batt_date: "Battery replacement"
  };

  const taskName = friendlyNames[field] || field;
  return `${taskName} is overdue for ${car.vehicle} (${car.plate_number})`;
}
