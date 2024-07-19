import { HireStyle } from "./hireStyle";

export default function Hire() {
  return (
    <HireStyle>
      <h2>Hire me</h2>
      <div className="container">
        <form action="#" method="POST">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message"></textarea>
          <input type="submit" value="Send" />
        </form>
      </div>
    </HireStyle>
  );
}
