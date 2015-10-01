<?php

class TM_CountdownTimer_Model_Sources_FlipTimerSkin
{
    public function toOptionArray()
    {
        return array(
            array(
                'value' => 'flip-light',
                'label' => 'Light',
            ),
            array(
                'value' => 'flip-dark',
                'label' => 'Dark',
            ),
        );
    }
}