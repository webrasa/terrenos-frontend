import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { FormElementBox } from '@/form/FormElementBox';
import { Label } from '@/form/Label';

const RandomForm = () => (
  <form className="grid grid-cols-1 gap-y-2 sm:grid-cols-6 sm:gap-y-5 lg:grid-cols-8">
    <Label htmlFor="name" colSpanSize="sm:col-span-2">
      Name *
    </Label>
    <FormElement
      colSpanSize="sm:col-span-4"
      helper="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <input id="name" type="text" />
    </FormElement>

    <Label htmlFor="email" colSpanSize="sm:col-start-1 sm:col-span-2">
      Email *
    </Label>
    <FormElement colSpanSize="sm:col-span-4">
      <input id="email" type="text" placeholder="john@example.com" />
    </FormElement>

    <Label htmlFor="age" colSpanSize="sm:col-start-1 sm:col-span-2">
      Age *
    </Label>
    <FormElement colSpanSize="sm:col-span-2">
      <input id="age" type="number" />
    </FormElement>

    <Label htmlFor="birthday" colSpanSize="sm:col-start-1 sm:col-span-2">
      Birthday *
    </Label>
    <FormElement colSpanSize="sm:col-span-4">
      <input id="birthday" type="date" />
    </FormElement>

    <Label htmlFor="datetime" colSpanSize="sm:col-start-1 sm:col-span-2">
      Datetime (local) *
    </Label>
    <FormElement colSpanSize="sm:col-span-4">
      <input id="datetime" type="datetime-local" />
    </FormElement>

    <Label htmlFor="month" colSpanSize="sm:col-start-1 sm:col-span-2">
      Month
    </Label>
    <FormElement colSpanSize="sm:col-span-4">
      <input id="month" type="month" />
    </FormElement>

    <Label htmlFor="time" colSpanSize="sm:col-start-1 sm:col-span-2">
      Time
    </Label>
    <FormElement colSpanSize="sm:col-span-2">
      <input id="time" type="time" />
    </FormElement>

    <Label htmlFor="website" colSpanSize="sm:col-start-1 sm:col-span-2">
      Website
    </Label>
    <FormElement
      colSpanSize="sm:col-span-4"
      helper="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <input id="website" type="url" placeholder="https://example.com" />
    </FormElement>

    <Label colSpanSize="sm:col-start-1 sm:col-span-2">Operating system</Label>
    <div className="flex space-x-5 sm:col-span-4">
      <FormElementBox htmlFor="linux" text="Linux">
        <input id="linux" name="os" type="radio" />
      </FormElementBox>

      <FormElementBox htmlFor="windows" text="Windows">
        <input id="windows" name="os" type="radio" />
      </FormElementBox>

      <FormElementBox htmlFor="macos" text="macOS">
        <input id="macos" name="os" type="radio" />
      </FormElementBox>
    </div>

    <Label htmlFor="status" colSpanSize="sm:col-start-1 sm:col-span-2">
      Status *
    </Label>
    <FormElement colSpanSize="sm:col-span-4">
      <select id="status">
        <option>Active</option>
        <option>Blocked</option>
      </select>
    </FormElement>

    <Label htmlFor="multiple" colSpanSize="sm:col-start-1 sm:col-span-2">
      Multiple selection *
    </Label>
    <FormElement colSpanSize="sm:col-span-4">
      <select id="multiple" multiple>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
        <option>Option 5</option>
      </select>
    </FormElement>

    <Label htmlFor="comment" colSpanSize="sm:col-start-1 sm:col-span-2">
      Additional comment *
    </Label>
    <FormElement colSpanSize="sm:col-span-4">
      <textarea id="textarea" rows={5} />
    </FormElement>

    <FormElementBox
      htmlFor="terms"
      text="I confirm that I have read the Terms"
      colSpanSize="sm:col-start-3 sm:col-span-4"
    >
      <input id="terms" type="checkbox" />
    </FormElementBox>

    <div className="sm:col-start-3">
      <button type="submit">
        <Button>Submit</Button>
      </button>
    </div>
  </form>
);

export { RandomForm };
