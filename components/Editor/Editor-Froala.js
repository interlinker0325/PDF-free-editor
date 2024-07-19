import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "@fortawesome/fontawesome-free/js/all.js";

const FroalaEditorComponent = dynamic(
  async () => {
    const editorModule = await import("react-froala-wysiwyg");
    window.FroalaEditor = require("froala-editor");

    if (typeof window !== "undefined" && window.FroalaEditor) {
      await import("@wiris/mathtype-froala");
      await Promise.all([import("froala-editor/js/plugins.pkgd.min.js")]);

      // Define custom popup template
      Object.assign(FroalaEditor.POPUP_TEMPLATES, {
        'customPlugin.popup': '[_CUSTOM_LAYER_][_BUTTONS_]'
      });

      // Define popup buttons
      Object.assign(FroalaEditor.DEFAULTS, {
        popupButtons: ['insert_tooltip', '|', 'popupClose'],
      });

      // Initialize the custom popup
      FroalaEditor.PLUGINS.customPlugin = function (editor) {
        // Create custom popup.
        function initPopup() {
          // Load popup template.
          var template = FroalaEditor.POPUP_TEMPLATES.customPopup;
          if (typeof template == "function") template = template.apply(editor);

          // Popup buttons.
          var popup_buttons = "";

          // Create the list of buttons.
          if (editor.opts.popupButtons.length > 1) {
            popup_buttons += '<div class="fr-buttons">';
            popup_buttons += editor.button.buildList(editor.opts.popupButtons);
            popup_buttons += "</div>";
          }

          // Load popup template.
          var template = {
            buttons: popup_buttons,
            custom_layer: '<div class="fr-input-line mx-2 pb-0"><input type="text" id="tooltip" placeholder="Input tooltip text" tabindex="1" /></div>',
          };

          // Create popup.
          var $popup = editor.popups.create("customPlugin.popup", template);

          return $popup;
        }

        // Show the popup
        function showPopup() {
          // Get the popup object defined above.
          var $popup = editor.popups.get("customPlugin.popup");

          // If popup doesn't exist then create it.
          // To improve performance it is best to create the popup when it is first needed
          // and not when the editor is initialized.
          if (!$popup) {
            $popup = initPopup();
          }

          // Set the editor toolbar as the popup's container.
          editor.popups.setContainer("customPlugin.popup", editor.$tb);

          // If the editor is not displayed when a toolbar button is pressed, then set BODY as the popup's container.
          // editor.popups.setContainer('customPlugin.popup', $('body'));

          // Trigger refresh for the popup.
          // editor.popups.refresh('customPlugin.popup');

          // This custom popup is opened by pressing a button from the editor's toolbar.
          // Get the button's object in order to place the popup relative to it.
          var $btn = editor.$tb.find('.fr-command[data-cmd="tooltip"]');

          // Compute the popup's position.
          var left = $btn.offset().left + $btn.outerWidth() / 2;
          var top =
            $btn.offset().top +
            (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

          // Show the custom popup.
          // The button's outerHeight is required in case the popup needs to be displayed above it.
          editor.popups.show(
            "customPlugin.popup",
            left,
            top,
            $btn.outerHeight()
          );
        }

        // Hide the custom popup.
        function hidePopup() {
          editor.popups.hide("customPlugin.popup");
        }

        // Methods visible outside the plugin.
        return {
          showPopup: showPopup,
          hidePopup: hidePopup,
        };
      };

      // Custome buttons
      FroalaEditor.DefineIcon("tooltip", {
        NAME: "comment-dots",
        template: "font_awesome",
      });

      FroalaEditor.RegisterCommand("tooltip", {
        title: "Insertar Nota",
        focus: false,
        undo: false,
        popup: true,
        // Buttons which are included in the editor toolbar should have the plugin property set.
        plugin: 'customPlugin',
        callback: function () {
          if (!this.popups.isVisible('customPlugin.popup')) {
            this.customPlugin.showPopup();
          }
          else {
            if (this.$el.find('.fr-marker')) {
              this.events.disableBlur();
              this.selection.restore();
            }
            this.popups.hide('customPlugin.popup');
          } 
        },
      });
    } else {
      console.error("Froala Editor is not initialized yet.");
    }

    // Define custom popup close button icon and command.
    FroalaEditor.DefineIcon("popupClose", { NAME: "times" });
    FroalaEditor.RegisterCommand("popupClose", {
      title: "Close",
      undo: false,
      focus: false,
      callback: function () {
        this.customPlugin.hidePopup();
      },
    });

    // Define custom popup 1.
    FroalaEditor.DefineIcon("insert_tooltip", { NAME: "square-check"});
    FroalaEditor.RegisterCommand("insert_tooltip", {
      title: "Insert",
      undo: true,
      focus: true,
      callback: function () {
        var selectedText = this.selection.text();
        var tooltipText = document.getElementById('tooltip').value.trim();
        if (selectedText.length > 0 && tooltipText.length > 0){
          // Create the tooltip element HTML string
          // You can customize this HTML and styling as needed
          var tooltipHTML = '<span class="custom-tooltip text-cyan-400" title="' + tooltipText + '">' + selectedText + '</span>';
          // Insert the tooltip HTML at the current selection
          this.html.insert(tooltipHTML);
          // Clear the current selection
          this.selection.clear();
          this.customPlugin.hidePopup();
        } else{
          // No text selected, you can handle this case as needed
          console.log('Please select some text to add a tooltip.');
        }
      },
    });

    return editorModule;
  },
  {
    ssr: false,
    // loading: () => <p>Loading...</p>,
  }
);

const Editor = ({
  editorContent,
  setChangedContent,
  section,
  setSection,
  ...props
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const [model, setModel] = useState("");

  useEffect(() => {
    setModel(editorContent.innerHTML);
    console.log(editorContent.innerHTML);
    setChangedContent(editorContent.innerHTML)
    try {
      const sectionTitleElement = editorContent.parentNode.getElementsByTagName("h2")[0];
      if(sectionTitleElement?.id != 'title'){
        setSection(sectionTitleElement.textContent);
      }
    } catch (e) {
      console.log("Please select correct section");
    }
  }, [editorContent]);


  const handleModelChange = (event) => {
    setChangedContent(event);
    setModel(event);
  };

  const config = {
    attribution: false,
    wordCounterCount: true,
    charCounterCount: true,
    codeMirror: false,
    linkAlwaysBlank: true,
    iconsTemplate: "font_awesome_5",
    placeholderText: "Edite aquí su contenido!",
    quickInsertButtons: ['image', 'table'],
    toolbarButtons: [
        "undo",
        "redo",
        "bold",
        "italic",
        "insertLink",
        'alignCenter',
        'alignJustify',
        "wirisEditor",
        "wirisChemistry",
        "insertImage",
        "tooltip",
        "paragraphFormat",
        "html",
        "fullscreen"
    ],
    imageEditButtons: [
      "wirisEditor",
      "wirisChemistry",
      "imageDisplay",
      "imageRemove",
    ],
    spellcheck: false,
    htmlAllowedTags: [".*"],
    htmlAllowedAttrs: [".*"],
    // Table styles
    tableColors: ['#159957', '#f2f2f2', '#fcf9e7', 'REMOVE'],
    colorsHEXInput: false,
    paragraphFormat:{
      H2: 'Section Title',
      Div: 'Text',
      P: 'Base Note',
    },
    paragraphStyles: {
      P: 'base_note'
    },
  };

  return (
    <div className="w-full h-full p-1">
      <div className="flex justify-between">
        <span className="font-semibold text-[30px]">{section}</span>
      </div>
      <form className="w-full h-full mt-5">
        {isBrowser && (
          <>
            <FroalaEditorComponent
              tag="textarea"
              config={config}
              model={model}
              onModelChange={handleModelChange}
            />
          </>
        )}
      </form>
    </div>
  );
};

export default Editor;
