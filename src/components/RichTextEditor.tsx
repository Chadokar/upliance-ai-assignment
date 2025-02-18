import React, { useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { Box, Button, Stack, Typography, Paper } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import 'draft-js/dist/Draft.css';

const RichTextEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)));
    }
    return EditorState.createEmpty();
  });

  const editorAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 20 },
  });

  useEffect(() => {
    const content = convertToRaw(editorState.getCurrentContent());
    localStorage.setItem('editorContent', JSON.stringify(content));
  }, [editorState]);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const AnimatedBox = animated(Box);

  return (
    <AnimatedBox style={editorAnimation}>
      <Stack spacing={2}>
        <Typography variant="h6" component="h2" fontWeight="bold">
          Rich Text Editor
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => toggleInlineStyle('BOLD')}
          >
            Bold
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => toggleInlineStyle('ITALIC')}
          >
            Italic
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => toggleInlineStyle('UNDERLINE')}
          >
            Underline
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => toggleBlockType('unordered-list-item')}
          >
            List
          </Button>
        </Stack>
        
        <Paper
          variant="outlined"
          sx={{
            minHeight: 200,
            p: 2,
            '& .DraftEditor-root': {
              height: '100%',
              '& .public-DraftEditor-content': {
                minHeight: 180,
              },
            },
          }}
        >
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
          />
        </Paper>
      </Stack>
    </AnimatedBox>
  );
};

export default RichTextEditor;