/**
 * Smart table column
 */
export interface SmartTableColumn {
  /**
   * The text to display for the column header
   */
  header?: string;
  /**
   * The field name that should be picked from data object
   */
  field?: string;
}

/**
 * Smart table columns model
 */
export const tableHeaders = [
  { header: 'Action', field: 'action' },
  { header: 'Name', field: 'name' },
  { header: 'Gender', field: 'gender' },
  { header: 'Birth Date', field: 'birthDate' },
  { header: 'IBAN', field: 'iban' },
  { header: 'Email', field: 'email' },
  { header: 'Full Address', field: 'address' },
];
