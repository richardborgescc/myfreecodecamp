<template>
  <div class="hello">
    <!--
      User Story #1: I can see a textarea element with 
      a corresponding id="editor".
    -->
    <textarea
      id="editor"
      style="width: 100%; height: 200px;"
      @keyup.prevent="convert()"
      v-model="textToConvert"
    />
    <!--
      User Story #2: I can see an element with 
      a corresponding id="preview".
    -->
    Preview:
    <div id="preview" v-html="markdown"/>
    <!--
      User Story #4: When I enter GitHub flavored markdown 
      into the #editor element, the text is rendered as HTML in 
      the #preview element as I type (HINT: You don't need to parse 
      Markdown yourself - you can import the Marked library for 
      this: https://cdnjs.com/libraries/marked).

      User Story #5: When my markdown previewer first loads, 
      the default text in the #editor field should contain valid 
      markdown that represents at least one of each of the following 
      elements: a header (H1 size), a sub header (H2 size), a link, 
      inline code, a code block, a list item, a blockquote, an image, 
      and bolded text.

      User Story #6: When my markdown previewer first loads, 
      the default markdown in the #editor field should be rendered as 
      HTML in the #preview element.

      Optional Bonus (you do not need to make this test pass): 
      My markdown previewer interprets carriage returns and renders 
      them as br (line break) elements.
    -->
  </div>
</template>

<script>
import markedLib from "marked";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    this.convert();
  },
  data() {
    return {
      textToConvert: `# H1
## H2

[build-a-markdown-previewer](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer)

Inline \`code\` has \`back-ticks around\` it.

\`\`\`javascript
var s = "JavaScript syntax highlighting";
alert(s);
\`\`\`

* 1
* 2

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

**bold**
      `,
      markdown: ""
    };
  },
  methods: {
    /*
      User Story #3: When I enter text into the 
      #editor element, the #preview element is updated as 
      I type to display the content of the textarea. 
    */
    convert() {
      this.markdown = markedLib(this.textToConvert);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
