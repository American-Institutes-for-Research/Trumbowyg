/* ===========================================================
 * trumbowyg.mathlive.js v1.0
 * MathML plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : loclamor
 * Author : JP Wrye
 */

/* globals MathJax */
(function ($) {
    'use strict';

    // If the plugin is a button
    //function buildButtonIcon() {
    //    if ($("#trumbowyg-mathlive").length > 0) {
    //        return;
    //    }

    //    /*
    //    When your button is created, an SVG will be inserted with an xref to a
    //    symbol living at the fragment "#trumbowyg-myplugin". For Trumbowyg's
    //    own plugins, this will come from a sprite sheet which is injected into
    //    the document, built from the icon SVG in "ui/icons" in your plugin's
    //    source tree. This is how you should organise things if you are
    //    proposing your plugin to be included in the Trumbowyg main
    //    distribution, or if you are rolling your own custom build of Trumbowyg
    //    for your site.

    //    But, nothing says it *has* to come from Trumbowyg's injected sprite
    //    sheet; it only requires that this symbol exists in your document. To
    //    allow stand-alone distribution of your plugin, we're going to insert a
    //    custom SVG symbol into the document with the correct ID.
    //    */
    //    const iconWrap = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    //    iconWrap.addClass("trumbowyg-icons");

    //    // For demonstration purposes, we've taken the "File" icon from
    //    // Remix Icon - https://remixicon.com/
    //    iconWrap.html(`
    //        <symbol id="trumbowyg-mathlive" viewBox="0 0 24 24">
    //             <path d="M426.024 86.447H209.705l-84.911 298.911c-2.568 7.967-9.854 13.482-18.22 13.771-.236 0-.464.006-.688.006a19.868 19.868 0 01-18.436-12.478l-34.714-86.782H19.851C8.884 299.876 0 290.986 0 280.022c0-10.965 8.893-19.854 19.851-19.854H66.18a19.862 19.862 0 0118.436 12.483l19.237 48.09 72.472-260.218a19.855 19.855 0 0118.903-13.781h230.798c10.97 0 19.854 8.89 19.854 19.851s-8.892 19.854-19.856 19.854zm10.699 266.78l-78.259-87.904 74.576-82.783c1.318-1.454 1.638-3.547.857-5.341a4.977 4.977 0 00-4.54-2.946h-47.18a4.995 4.995 0 00-3.759 1.72l-50.059 58.047-49.674-58.029a4.95 4.95 0 00-3.771-1.738H225.58a4.947 4.947 0 00-4.521 2.929 4.939 4.939 0 00.824 5.332l73.743 82.81-77.641 87.923a4.977 4.977 0 00-.813 5.325 4.978 4.978 0 004.528 2.92h48.9c1.472 0 2.867-.65 3.807-1.785l51.819-62.181 53.05 62.229a4.972 4.972 0 003.782 1.743h49.97a4.938 4.938 0 004.527-2.926 4.966 4.966 0 00-.832-5.345z"/>
    //        </symbol>
    //    `).appendTo(document.body);
    //}

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                mathlive: 'Insert Formulas',
                formulas: 'Formulas',
                inline: 'Inline'
            },
            az: {
                mathlive: 'Düstur əlavə et',
                formulas: 'Düsturlar',
                inline: 'Sətir içi'
            },
            by: {
                mathlive: 'Уставіць формулу',
                formulas: 'Формула',
                inline: 'Inline-элемент'
            },
            ca: {
                mathlive: 'Inserir Fórmula',
                formulas: 'Fórmula',
                inline: 'En línia'
            },
            da: {
                mathlive: 'Indsæt formler',
                formulas: 'Formler',
                inline: 'Inline'
            },
            de: {
                mathlive: 'Formel einfügen',
                formulas: 'Formel',
                inline: 'Innerhalb der Zeile'
            },
            es: {
                mathlive: 'Insertar Fórmula',
                formulas: 'Fórmula',
                inline: 'En línea'
            },
            et: {
                mathlive: 'Sisesta valem',
                formulas: 'Valemid',
                inline: 'Teksti sees'
            },
            fr: {
                mathlive: 'Inserer une formule',
                formulas: 'Formule',
                inline: 'En ligne'
            },
            hu: {
                mathlive: 'Formulák beszúrás',
                formulas: 'Formulák',
                inline: 'Inline'
            },
            ko: {
                mathlive: '수식 넣기',
                formulas: '수식',
                inline: '글 안에 넣기'
            },
            pt_br: {
                mathlive: 'Inserir fórmulas',
                formulas: 'Fórmulas',
                inline: 'Em linha'
            },
            ru: {
                mathlive: 'Вставить формулу',
                formulas: 'Формула',
                inline: 'Строчный элемент'
            },
            sl: {
                mathlive: 'Vstavi matematični izraz',
                formulas: 'Formula',
                inline: 'V vrstici'
            },
            tr: {
                mathlive: 'Formül Ekle',
                formulas: 'Formüller',
                inline: 'Satır içi'
            },
            zh_tw: {
                mathlive: '插入方程式',
                formulas: '方程式',
                inline: '內嵌'
            },
        },
        // jshint camelcase:true

        plugins: {
            mathlive: {
                init: function (trumbowyg) {
                    var mathliveOptions = {
                        formulas: {
                            label: trumbowyg.lang.formulas,
                            required: true,
                            value: '',
                            inputType: 'math',
                            type: function(field, fieldId, prefix, lg) {
                                var html = '<div class="' + prefix + 'input-row">' +
                                    '<div class="' + prefix + 'input-infos">' +
                                    '<label for="' + fieldId + '">' +
                                    '<span>' + (lg[field.label] ? lg[field.label] : field.label) + '</span>' +
                                    '</label>' +
                                    '</div>' +
                                    '<div class="' + prefix + 'input-html">' +
                                    '<math-field type="math-field" style="display: block;">' +
                                    field.value +
                                    '</math-field>' +
                                    '</div>' +
                                    '</div>';

                                return html;
                            }
                        },
                        inline: {
                            label: trumbowyg.lang.inline,
                            attributes: {
                                checked: true
                            },
                            type: 'checkbox',
                            required: false,
                        }
                    };

                    MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});

                    var mathmlCallback = function (v) {
                        var delimiter = v.inline ? '$' : '$$';
                        if (trumbowyg.currentMathNode) {
                            $(trumbowyg.currentMathNode)
                                .html(delimiter + ' ' + v.formulas + ' ' + delimiter)
                                .attr('formulas', v.formulas)
                                .attr('inline', (v.inline ? 'true' : 'false'));
                        } else {
                            var mlFormulas = MathLive.convertLatexToMathMl(v.formulas);
                            var html = '<span contenteditable="false" formulas="' + v.formulas + '" inline="' + (v.inline ? 'true' : 'false') + '" >' + delimiter + ' ' + v.formulas + ' ' + delimiter + '</span>';
                            var node = $(html)[0];
                            node.onclick = openModal;

                            trumbowyg.range.deleteContents();
                            trumbowyg.range.insertNode(node);
                        }

                        trumbowyg.currentMathNode = false;
                        MathJax.Hub.Queue(['Typeset', MathJax.Hub, node]);
                        return true;
                    };

                    var openModalInsert = function (title, fields, cmd) {
                        var t = trumbowyg,
                            prefix = t.o.prefix,
                            lg = t.lang,
                            html = '',
                            idPrefix = prefix + 'form-' + Date.now() + '-';

                        $.each(fields, function (fieldName, field) {
                            var l = field.label || fieldName,
                                n = field.name || fieldName,
                                a = field.attributes || {},
                                fieldId = idPrefix + fieldName;

                            var attr = Object.keys(a).map(function (prop) {
                                return prop + '="' + a[prop] + '"';
                            }).join(' ');

                            if (typeof field.type === 'function') {
                                if (!field.name) {
                                    field.name = n;
                                }

                                html += field.type(field, fieldId, prefix, lg);

                                return;
                            }

                            html += '<div class="' + prefix + 'input-row">';
                            html += '<div class="' + prefix + 'input-infos"><label for="' + fieldId + '"><span>' + (lg[l] ? lg[l] : l) + '</span></label></div>';
                            html += '<div class="' + prefix + 'input-html">';

                            if ($.isPlainObject(field.options)) {
                                html += '<select name="target">';
                                html += Object.keys(field.options).map((optionValue) => {
                                    return '<option value="' + optionValue + '" ' + (optionValue === field.value ? 'selected' : '') + '>' + field.options[optionValue] + '</option>';
                                }).join('');
                                html += '</select>';
                            } else {

                                if (field.inputType === "math"){
                                    html += '<math-field id="' + fieldId + '" name="' + n + '" ' + attr;
                                } else {
                                    html += '<input id="' + fieldId + '" type="' + (field.type || 'text') + '" name="' + n + '" ' + attr;
                                }
                                html += (field.type === 'checkbox' && field.value ? ' checked="checked"' : '') + ' value="' + (field.value || '').replace(/"/g, '&quot;') + '">';
                            }

                            html += '</div></div>';
                        });

                        return t.openModal(title, html)
                            .on("tbwconfirm", function (e) {
                                e.preventDefault();
                                var $form = $('form', $(this)),
                                    valid = true,
                                    values = {};

                                $.each(fields, function (fieldName, field) {
                                    var n = field.name || fieldName;

                                    var $field = null;

                                    if (field.inputType === "math")
                                    {
                                        $field = $('math-field', $form);
                                    } else {
                                        $field = $(':input[name="' + n + '"]', $form);
                                    }

                                    var inputType = $field[0].type;

                                    switch (inputType.toLowerCase()) {
                                        case 'checkbox':
                                            values[n] = $field.is(':checked');
                                            break;
                                        case 'radio':
                                            values[n] = $field.filter(':checked').val();
                                            break;
                                        default:
                                            values[n] = $.trim($field.val());
                                            break;
                                    }
                                    // Validate value
                                    if (field.required && values[n] === '') {
                                        valid = false;
                                        t.addErrorOnModalField($field, t.lang.required);
                                    } else if (field.pattern && !field.pattern.test(values[n])) {
                                        valid = false;
                                        t.addErrorOnModalField($field, field.patternError);
                                    }
                                });

                                if (valid) {
                                    t.restoreRange();

                                    if (cmd(values, fields)) {
                                        t.syncCode();
                                        t.$c.trigger('tbwchange');
                                        t.closeModal();

                                        return true;
                                    }
                                }

                                return false;
                            })
                            .one("tbwcancel", function () {
                                $(this).off("tbwconfirm");
                                t.closeModal();
                            });
                    }

                    var openModal = function () {
                        trumbowyg.currentMathNode = this;
                        mathliveOptions.formulas.value = $(this).attr('formulas');

                        if ($(this).attr('inline') === 'true') {
                            mathliveOptions.inline.attributes.checked = true;
                        } else {
                            delete mathliveOptions.inline.attributes.checked;
                        }

                        openModalInsert(trumbowyg.lang.mathml, mathliveOptions, mathmlCallback);
                    };

                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();

                            mathliveOptions.formulas.value = trumbowyg.getRangeText();
                            mathliveOptions.inline.attributes.checked = true;
                            openModalInsert(trumbowyg.lang.mathml, mathliveOptions, mathmlCallback);
                        }
                    };

                    trumbowyg.$ta.on('tbwinit', function () {
                        var nodes = trumbowyg.$ed.find('[formulas]');

                        nodes.each(function (i, elem) {
                            elem.onclick = openModal;
                        });
                    });

                    //buildButtonIcon();

                    trumbowyg.addBtnDef('mathlive', btnDef);
                }
            }
        }
    });
})(jQuery);
