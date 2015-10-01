<?php

class TM_CountdownTimer_Model_Sources_FlipTimerSize
{
    public function toOptionArray()
    {
        return array(
            array(
                'value' => 'flip-small',
                'label' => 'Small',
            ),
            array(
                'value' => 'flip-medium',
                'label' => 'Medium',
            ),
            array(
                'value' => 'flip-large',
                'label' => 'Large',
            ),
        );
    }
}