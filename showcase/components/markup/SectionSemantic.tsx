import type React from "react";
import { Section } from "../layout/Section.tsx";
import "./SectionSemantic.scss";

export const SectionSemantic: React.FC = () => {
  return (
    <Section label="Semantic Elements">
      <p>
        This is a standard paragraph element. It is used to group together
        related sentences and provide structure to the content. Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Pariatur nostrum fugit
        possimus quaerat quia animi quisquam adipisci assumenda impedit delectus
        modi rerum mollitia, deserunt obcaecati veniam distinctio saepe ex
        autem.
      </p>
      <blockquote>
        <p>
          This is a blockquote. It is often used to quote a large block of text
          from another source.
        </p>
        <cite>— Author Name</cite>
      </blockquote>

      <hr />

      <h3>Lists</h3>
      <ul>
        <li>List item one</li>
        <li>
          List item two
          <ul>
            <li>Nested item one</li>
            <li>Nested item two</li>
          </ul>
        </li>
        <li>List item three</li>
      </ul>

      <ol>
        <li>First step</li>
        <li>
          Second step
          <ol>
            <li>Sub-step A</li>
            <li>Sub-step B</li>
          </ol>
        </li>
        <li>Third step</li>
      </ol>

      <dl>
        <dt>Term 1</dt>
        <dd>Description for term 1</dd>
        <dt>Term 2</dt>
        <dd>Description for term 2</dd>
        <dl>
          <dt>Sub-term A</dt>
          <dd>Description for sub-term A</dd>
          <dt>Sub-term B</dt>
          <dd>Description for sub-term B</dd>
        </dl>
        <dt>Term 3</dt>
        <dd>Description for term 3</dd>
      </dl>

      <hr />

      <h3>Inline text elements</h3>

      <p>
        <a href="#your-mom">Primary link</a>
      </p>

      <div className="d-flex flex-wrap gap-base mb-3 spread">
        <div>
          <p>
            <strong>Bold</strong>
          </p>
        </div>
        <div>
          <p>
            <em>Italic</em>
          </p>
        </div>
        <div>
          <p>
            <u>Underline</u>
          </p>
        </div>
        <div>
          <p>
            <mark>Highlighted</mark>
          </p>
        </div>
        <div>
          <p>
            <del>Deleted</del>
          </p>
        </div>
        <div>
          <p>
            <ins>Inserted</ins>
          </p>
        </div>
        <div>
          <p>
            <s>Strikethrough</s>
          </p>
        </div>
        <div>
          <p>
            <small>Small text</small>
          </p>
        </div>
        <div>
          <p>
            Text <sup>Sup</sup>
          </p>
        </div>
        <div>
          <p>
            Text <sub>Sub</sub>
          </p>
        </div>
        <div>
          <p>
            <abbr title="As Soon As Possible">ASAP</abbr>
          </p>
        </div>
        <div>
          <p>
            <code>const x = 1;</code>
          </p>
        </div>
      </div>

      <p>This is an address block:</p>
      <address>
        Example.com
        <br />
        Box 564, Disneyland
        <br />
        USA
      </address>

      <pre>
        function helloWorld() {"{"}
        console.log("Hello, world!");
        {"}"}
      </pre>

      <details>
        <summary>Click to expand</summary>
        <p>
          This is the hidden content that is revealed when the user clicks on
          the summary.
        </p>
      </details>
    </Section>
  );
};
