# Chemistry Learning App Bugs

## Fixed Bugs
1. ✅ We need a way for the user to type in subscripts for chemical formulas.
   - Added support for Ctrl+Number key combinations to insert subscript numbers
   - Implemented FormulaDisplay component to properly render subscripts in answers and question formulas
   
2. ✅ Answers for some questions are updating other text fields.
   - Fixed by implementing unique keys for each answer field based on question ID and index
   - Created separate keys for formula and naming questions to prevent cross-contamination

## How To Use Subscripts
- When entering chemical formulas, press Ctrl+Number to insert a subscript
- For example:
  - To enter H₂O, type H, then press Ctrl+2, then type O
  - To enter CO₂, type C, then type O, then press Ctrl+2