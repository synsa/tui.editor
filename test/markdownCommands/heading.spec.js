'use strict';

var Heading = require('../../src/js/markdownCommands/heading'),
    MarkdownEditor = require('../../src/js/markdownEditor'),
    EventManager = require('../../src/js/eventManager');


describe('Heading', function() {
    var cm,
        doc,
        mde;

    beforeEach(function() {
        var $container = $('<div />'),
            sourceText;

        $('body').append($container);

        mde = new MarkdownEditor($container, new EventManager());

        mde.init();

        cm = mde.getEditor();

        sourceText = ['mytext1', '', 'mytext2', 'mytext3'];

        cm.setValue(sourceText.join('\n'));
        doc = cm.getDoc();
    });

    afterEach(function() {
        $('body').empty();
    });

    describe('특정라인에서 커맨드실행시 해당라인의 첫번째 컬럼에 #가 추가된다', function() {
        it('텍스트가 있는 라인시작에 #가 추가되었다', function() {
            doc.setCursor(2, 3);

            Heading.exec(mde, 1);

            expect(cm.getValue()).toEqual(['mytext1', '', '# mytext2', 'mytext3'].join('\n'));
        });

        it('빈 라인시작에 #가 추가되었다', function() {
            doc.setCursor(1, 3);

            Heading.exec(mde, 1);

            expect(cm.getValue()).toEqual(['mytext1', '# ', 'mytext2', 'mytext3'].join('\n'));
        });
    });

    describe('셀렉션을 지정한상태에서 커맨드를 사용하면 해당 텍스트들에 해딩이 추가된다.', function() {
        it('해딩이 정상적으로 추가되었다', function() {
            doc.setSelection({line: 0, ch: 3}, {line: 2, ch: 2});

            Heading.exec(mde, 1);

            expect(cm.getValue()).toEqual(['# mytext1', '# ', '# mytext2', 'mytext3'].join('\n'));
        });
    });

    describe('Toggle', function() {
        it('if already have heading toggle to next heading', function() {
            doc.setCursor(2, 3);

            Heading.exec(mde, 2);

            expect(cm.getValue()).toEqual(['mytext1', '', '## mytext2', 'mytext3'].join('\n'));
        });
    });
});
