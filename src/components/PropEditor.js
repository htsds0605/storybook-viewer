import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

// A very simple prop editor that only supports `oneOf` from prop-types
const PropEditor = ({ propTypes, propValues, onPropChange }) => {
  if (!propTypes) {
    return null;
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <Typography variant="h6" gutterBottom>
        Props
      </Typography>
      {Object.keys(propTypes).map((propName) => {
        const propType = propTypes[propName];

        // This is a hacky way to check for oneOf. A real implementation would be more robust.
        // It relies on the internal implementation of the prop-types library.
        // For the sake of this demo, we assume that if the validator function has a `toString`
        // that includes 'oneOf', it's a oneOf prop.
        if (propType && typeof propType === 'function' && propType.toString().includes('oneOf')) {
            // This is also a hacky way to extract the values from the prop-type definition.
            // It assumes a specific format for the toString() output of the oneOf validator.
            const oneOfValues = /oneOf\(([^)]+)\)/.exec(propType.toString());
            if (oneOfValues && oneOfValues[1]) {
                const values = JSON.parse(oneOfValues[1].replace(/'/g, '"'));
                return (
                    <FormControl key={propName} fullWidth margin="normal">
                    <InputLabel>{propName}</InputLabel>
                    <Select
                        value={propValues[propName] || ''}
                        onChange={(e) => onPropChange(propName, e.target.value)}
                    >
                        {values.map((value) => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                );
            }
        }
        return null;
      })}
    </div>
  );
};

export default PropEditor;
