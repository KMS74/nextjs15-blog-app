"use client";


const MY_NAME = "Karim Shabana";

export function Copyright() {

  return (
    <p>
      © {new Date().getFullYear()} {MY_NAME}. All rights reserved.
    </p>
  );
}
