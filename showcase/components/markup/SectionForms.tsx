import type React from "react";
import { Section } from "../layout/Section.tsx";

export const SectionForms: React.FC = () => {
  return (
    <Section label="Forms">
      <form onSubmit={(event) => event.preventDefault()}>
        <fieldset>
          <legend>Personal Information</legend>
          <div>
            <label htmlFor="text">Text Input:</label>
            <input type="text" id="text" name="text" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="email">Email Input:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Preferences</legend>
          <div>
            <label htmlFor="select">Select One:</label>
            <select id="select" name="select">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <fieldset>
            <legend>Checkboxes</legend>
            <label>
              <input type="checkbox" name="check" value="1" /> Item 1
            </label>
            <label>
              <input type="checkbox" name="check" value="2" /> Item 2
            </label>
          </fieldset>
          <fieldset>
            <legend>Radio Buttons</legend>
            <label>
              <input type="radio" name="radio" value="1" /> Choice A
            </label>
            <label>
              <input type="radio" name="radio" value="2" /> Choice B
            </label>
          </fieldset>
        </fieldset>

        <fieldset>
          <legend>Message</legend>
          <div>
            <label htmlFor="textarea">Your Message:</label>
            <textarea id="textarea" name="textarea" rows={4}></textarea>
          </div>
          <div>
            <label htmlFor="textarea">Attribution:</label>
            <textarea
              id="textarea"
              name="textarea"
              rows={4}
              cols={20}
            ></textarea>
          </div>
        </fieldset>
        <div>
          <button type="submit">Submit Form</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </Section>
  );
};
